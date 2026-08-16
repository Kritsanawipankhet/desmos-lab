"""Convert SVG geometry to Desmos point-list expressions."""

from __future__ import annotations

import math
import re
from dataclasses import dataclass
from io import StringIO
from xml.etree import ElementTree as ET

from svgpathtools import parse_path


NUMBER = r"[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?"
MAX_FILE_BYTES = 2 * 1024 * 1024
DEFAULT_COLOR = "#000000"


@dataclass(frozen=True)
class Matrix:
    a: float = 1
    b: float = 0
    c: float = 0
    d: float = 1
    e: float = 0
    f: float = 0

    def __matmul__(self, other: "Matrix") -> "Matrix":
        return Matrix(
            self.a * other.a + self.c * other.b,
            self.b * other.a + self.d * other.b,
            self.a * other.c + self.c * other.d,
            self.b * other.c + self.d * other.d,
            self.a * other.e + self.c * other.f + self.e,
            self.b * other.e + self.d * other.f + self.f,
        )

    def apply(self, point: complex) -> tuple[float, float]:
        return (
            self.a * point.real + self.c * point.imag + self.e,
            self.b * point.real + self.d * point.imag + self.f,
        )


def parse_transform(value: str | None) -> Matrix:
    result = Matrix()
    for name, raw_args in re.findall(r"([a-zA-Z]+)\s*\(([^)]*)\)", value or ""):
        args = [float(x) for x in re.findall(NUMBER, raw_args)]
        name = name.lower()
        if name == "matrix" and len(args) == 6:
            current = Matrix(*args)
        elif name == "translate" and args:
            current = Matrix(e=args[0], f=args[1] if len(args) > 1 else 0)
        elif name == "scale" and args:
            current = Matrix(a=args[0], d=args[1] if len(args) > 1 else args[0])
        elif name == "rotate" and args:
            angle = math.radians(args[0])
            rotation = Matrix(math.cos(angle), math.sin(angle), -math.sin(angle), math.cos(angle))
            if len(args) >= 3:
                cx, cy = args[1:3]
                current = Matrix(e=cx, f=cy) @ rotation @ Matrix(e=-cx, f=-cy)
            else:
                current = rotation
        elif name == "skewx" and args:
            current = Matrix(c=math.tan(math.radians(args[0])))
        elif name == "skewy" and args:
            current = Matrix(b=math.tan(math.radians(args[0])))
        else:
            continue
        result = result @ current
    return result


def _tag(element: ET.Element) -> str:
    return element.tag.rsplit("}", 1)[-1].lower()


def _num(element: ET.Element, name: str, default: float = 0) -> float:
    match = re.search(NUMBER, element.get(name, ""))
    return float(match.group()) if match else default


def _shape_path(element: ET.Element) -> str | None:
    tag = _tag(element)
    if tag == "path":
        return element.get("d")
    if tag in {"polyline", "polygon"}:
        values = re.findall(NUMBER, element.get("points", ""))
        pairs = list(zip(values[::2], values[1::2]))
        if not pairs:
            return None
        body = "M " + " L ".join(f"{x} {y}" for x, y in pairs)
        return body + (" Z" if tag == "polygon" else "")
    if tag == "line":
        return f"M {_num(element, 'x1')} {_num(element, 'y1')} L {_num(element, 'x2')} {_num(element, 'y2')}"
    if tag == "rect":
        x, y = _num(element, "x"), _num(element, "y")
        w, h = _num(element, "width"), _num(element, "height")
        if w > 0 and h > 0:
            return f"M{x} {y}H{x+w}V{y+h}H{x}Z"
    if tag in {"circle", "ellipse"}:
        cx, cy = _num(element, "cx"), _num(element, "cy")
        rx = _num(element, "r") if tag == "circle" else _num(element, "rx")
        ry = _num(element, "r") if tag == "circle" else _num(element, "ry")
        if rx > 0 and ry > 0:
            return f"M{cx-rx} {cy}A{rx} {ry} 0 1 0 {cx+rx} {cy}A{rx} {ry} 0 1 0 {cx-rx} {cy}Z"
    return None


def _fmt(value: float) -> str:
    value = 0 if abs(value) < 1e-10 else value
    return f"{value:.5f}".rstrip("0").rstrip(".")


def _style(element: ET.Element, inherited: dict[str, str]) -> dict[str, str]:
    result = inherited.copy()
    inline = {}
    for declaration in element.get("style", "").split(";"):
        if ":" in declaration:
            key, value = declaration.split(":", 1)
            inline[key.strip().lower()] = value.strip()
    for name in ("fill", "stroke", "opacity", "stroke-opacity"):
        value = element.get(name, inline.get(name))
        if value is not None and value.strip().lower() != "inherit":
            result[name] = value.strip()
    return result


def _desmos_color(value: str | None) -> str | None:
    if not value or value.lower() in {"none", "transparent"}:
        return None
    value = value.strip().lower()
    if re.fullmatch(r"#[0-9a-f]{3}", value):
        return "#" + "".join(character * 2 for character in value[1:])
    if re.fullmatch(r"#[0-9a-f]{6}", value):
        return value
    match = re.fullmatch(
        r"rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)", value
    )
    if match:
        channels = [min(255, int(channel)) for channel in match.groups()]
        return "#" + "".join(f"{channel:02x}" for channel in channels)
    return None


def _opacity(style: dict[str, str]) -> float:
    try:
        return max(
            0,
            min(1, float(style.get("opacity", "1")) * float(style.get("stroke-opacity", "1"))),
        )
    except ValueError:
        return 1


def convert_svg(data: bytes, samples_per_curve: int = 18) -> dict:
    if not data or len(data) > MAX_FILE_BYTES:
        raise ValueError("The file must be between 1 byte and 2 MB")
    try:
        root = ET.parse(StringIO(data.decode("utf-8-sig"))).getroot()
    except (ET.ParseError, UnicodeDecodeError) as exc:
        raise ValueError("The SVG file is invalid") from exc
    if _tag(root) != "svg":
        raise ValueError("This file is not an SVG")

    polylines: list[tuple[list[tuple[float, float]], str, float]] = []

    def walk(
        element: ET.Element, parent_matrix: Matrix, inherited_style: dict[str, str]
    ) -> None:
        matrix = parent_matrix @ parse_transform(element.get("transform"))
        style = _style(element, inherited_style)
        color = (
            _desmos_color(style.get("stroke"))
            or _desmos_color(style.get("fill"))
            or DEFAULT_COLOR
        )
        path_data = _shape_path(element)
        if path_data:
            try:
                path = parse_path(path_data)
            except Exception as exc:
                raise ValueError("The SVG contains an invalid path") from exc
            # A single <path> may contain multiple shapes separated by M/m.
            # Each one must become its own Desmos point list; otherwise Desmos
            # draws an unwanted line between two unrelated subpaths.
            for subpath in path.continuous_subpaths():
                points: list[tuple[float, float]] = []
                for segment in subpath:
                    count = (
                        1
                        if segment.__class__.__name__ == "Line"
                        else samples_per_curve
                    )
                    sampled = [
                        matrix.apply(segment.point(i / count))
                        for i in range(count + 1)
                    ]
                    if points and sampled and points[-1] == sampled[0]:
                        sampled = sampled[1:]
                    points.extend(sampled)
                if len(points) >= 2:
                    polylines.append((points, color, _opacity(style)))
        for child in element:
            walk(child, matrix, style)

    walk(root, Matrix(), {"fill": DEFAULT_COLOR, "stroke": "none"})
    if not polylines:
        raise ValueError("No supported paths or shapes were found in the SVG")

    all_points = [point for line, _, _ in polylines for point in line]
    min_x = min(x for x, _ in all_points)
    max_x = max(x for x, _ in all_points)
    min_y = min(y for _, y in all_points)
    max_y = max(y for _, y in all_points)
    center_x, center_y = (min_x + max_x) / 2, (min_y + max_y) / 2
    scale = 18 / max(max_x - min_x, max_y - min_y, 1)

    expressions = []
    for index, (line, color, opacity) in enumerate(polylines, 1):
        normalized = [((x - center_x) * scale, -(y - center_y) * scale) for x, y in line]
        latex = "[" + ",".join(f"({_fmt(x)},{_fmt(y)})" for x, y in normalized) + "]"
        expressions.append(
            {
                "id": f"svg_{index}",
                "latex": latex,
                "color": color,
                "lineOpacity": opacity,
                "lines": True,
                "points": False,
            }
        )

    return {"expressions": expressions, "bounds": {"left": -10, "right": 10, "bottom": -10, "top": 10}}
