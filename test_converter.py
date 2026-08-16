from converter import convert_svg, parse_transform


def test_converts_path_and_shapes():
    svg = b'''<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <path d="M0 0 C 20 0 20 20 40 20"/>
      <circle cx="60" cy="60" r="10"/>
    </svg>'''
    result = convert_svg(svg, samples_per_curve=4)
    assert len(result["expressions"]) == 2
    assert result["expressions"][0]["latex"].startswith("[")
    assert result["expressions"][0]["lines"] is True


def test_nested_transform():
    matrix = parse_transform("translate(10 20) scale(2)")
    assert matrix.apply(complex(1, 1)) == (12, 22)


def test_separates_subpaths_in_one_path():
    svg = b'''<svg xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H10V10Z M20 20H30V30Z M40 40H50V50Z"/>
    </svg>'''
    result = convert_svg(svg)
    assert len(result["expressions"]) == 3
    assert [item["id"] for item in result["expressions"]] == [
        "svg_1",
        "svg_2",
        "svg_3",
    ]


def test_inherits_fill_and_prefers_stroke_color():
    svg = b'''<svg xmlns="http://www.w3.org/2000/svg" fill="#abc">
      <g><path d="M0 0L10 10"/></g>
      <path d="M20 20L30 30" style="stroke: rgb(255, 0, 16); fill: none"/>
    </svg>'''
    result = convert_svg(svg)
    assert result["expressions"][0]["color"] == "#aabbcc"
    assert result["expressions"][1]["color"] == "#ff0010"


def test_rejects_non_svg():
    try:
        convert_svg(b"<html></html>")
    except ValueError as error:
        assert "SVG" in str(error)
    else:
        raise AssertionError("expected ValueError")
