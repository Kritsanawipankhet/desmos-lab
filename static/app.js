const calculator2d = Desmos.GraphingCalculator(document.getElementById("calculator-2d"), {
  expressionsCollapsed: false,
  settingsMenu: false,
  keypad: true,
  showGrid: true,
  showXAxis: true,
  showYAxis: true,
});

const calculator3d = Desmos.Calculator3D(document.getElementById("calculator-3d"), {
  expressionsCollapsed: false,
  settingsMenu: true,
  keypad: true,
});

const demos = {
  waves: {
    label: "Wave surface",
    expressions: [
      { id: "surface", latex: "z=\\sin(x)\\cos(y)" },
      { id: "origin", latex: "(0,0,0)", color: Desmos.Colors.RED },
    ],
  },
  sphere: {
    label: "Sphere and plane",
    expressions: [
      { id: "sphere", latex: "\\operatorname{sphere}((0,0,0),3)", color: Desmos.Colors.BLUE },
      { id: "plane", latex: "z=x", color: Desmos.Colors.RED },
    ],
  },
  helix: {
    label: "Parametric helix",
    expressions: [
      { id: "helix", latex: "(3\\cos(t),3\\sin(t),t/2)\\{0<t<8\\pi\\}", color: Desmos.Colors.PURPLE },
      { id: "axis", latex: "(0,0,t)\\{-1<t<14\\}", color: Desmos.Colors.BLACK },
    ],
  },
  rotation: {
    label: "Rotating cube",
    expressions: [
      {
        id: "angle",
        latex: "a=0",
        sliderBounds: { min: "0", max: "2\\pi", step: "0.02" },
        playing: true,
      },
      { id: "rotation-x", latex: "X(x,y)=x\\cos(a)-y\\sin(a)" },
      { id: "rotation-y", latex: "Y(x,y)=x\\sin(a)+y\\cos(a)" },
      { id: "p1", latex: "P_1=(X(-2,-2),Y(-2,-2),-2)" },
      { id: "p2", latex: "P_2=(X(2,-2),Y(2,-2),-2)" },
      { id: "p3", latex: "P_3=(X(2,2),Y(2,2),-2)" },
      { id: "p4", latex: "P_4=(X(-2,2),Y(-2,2),-2)" },
      { id: "p5", latex: "P_5=(X(-2,-2),Y(-2,-2),2)" },
      { id: "p6", latex: "P_6=(X(2,-2),Y(2,-2),2)" },
      { id: "p7", latex: "P_7=(X(2,2),Y(2,2),2)" },
      { id: "p8", latex: "P_8=(X(-2,2),Y(-2,2),2)" },
      { id: "bottom", latex: "[\\operatorname{segment}(P_1,P_2),\\operatorname{segment}(P_2,P_3),\\operatorname{segment}(P_3,P_4),\\operatorname{segment}(P_4,P_1)]", color: Desmos.Colors.BLUE },
      { id: "top", latex: "[\\operatorname{segment}(P_5,P_6),\\operatorname{segment}(P_6,P_7),\\operatorname{segment}(P_7,P_8),\\operatorname{segment}(P_8,P_5)]", color: Desmos.Colors.BLUE },
      { id: "sides", latex: "[\\operatorname{segment}(P_1,P_5),\\operatorname{segment}(P_2,P_6),\\operatorname{segment}(P_3,P_7),\\operatorname{segment}(P_4,P_8)]", color: Desmos.Colors.PURPLE },
      { id: "rotation-axis", latex: "(0,0,t)\\{-4<t<4\\}", color: Desmos.Colors.RED },
    ],
  },
  scaling: {
    label: "Scaling a model",
    expressions: [
      { id: "scale-x", latex: "s_x=1.5", sliderBounds: { min: "0.25", max: "2.5", step: "0.05" } },
      { id: "scale-y", latex: "s_y=1", sliderBounds: { min: "0.25", max: "2.5", step: "0.05" } },
      { id: "scale-z", latex: "s_z=2", sliderBounds: { min: "0.25", max: "2.5", step: "0.05" } },
      { id: "scale-rule", latex: "S(x,y,z)=(s_x\\cdot x,s_y\\cdot y,s_z\\cdot z)" },
      { id: "q1", latex: "Q_1=S(-1,-1,-1)" },
      { id: "q2", latex: "Q_2=S(1,-1,-1)" },
      { id: "q3", latex: "Q_3=S(1,1,-1)" },
      { id: "q4", latex: "Q_4=S(-1,1,-1)" },
      { id: "q5", latex: "Q_5=S(-1,-1,1)" },
      { id: "q6", latex: "Q_6=S(1,-1,1)" },
      { id: "q7", latex: "Q_7=S(1,1,1)" },
      { id: "q8", latex: "Q_8=S(-1,1,1)" },
      { id: "original-bottom", latex: "[\\operatorname{segment}((-1,-1,-1),(1,-1,-1)),\\operatorname{segment}((1,-1,-1),(1,1,-1)),\\operatorname{segment}((1,1,-1),(-1,1,-1)),\\operatorname{segment}((-1,1,-1),(-1,-1,-1))]", color: Desmos.Colors.BLACK, lineOpacity: 0.35 },
      { id: "original-top", latex: "[\\operatorname{segment}((-1,-1,1),(1,-1,1)),\\operatorname{segment}((1,-1,1),(1,1,1)),\\operatorname{segment}((1,1,1),(-1,1,1)),\\operatorname{segment}((-1,1,1),(-1,-1,1))]", color: Desmos.Colors.BLACK, lineOpacity: 0.35 },
      { id: "original-sides", latex: "[\\operatorname{segment}((-1,-1,-1),(-1,-1,1)),\\operatorname{segment}((1,-1,-1),(1,-1,1)),\\operatorname{segment}((1,1,-1),(1,1,1)),\\operatorname{segment}((-1,1,-1),(-1,1,1))]", color: Desmos.Colors.BLACK, lineOpacity: 0.35 },
      { id: "scaled-bottom", latex: "[\\operatorname{segment}(Q_1,Q_2),\\operatorname{segment}(Q_2,Q_3),\\operatorname{segment}(Q_3,Q_4),\\operatorname{segment}(Q_4,Q_1)]", color: Desmos.Colors.BLUE },
      { id: "scaled-top", latex: "[\\operatorname{segment}(Q_5,Q_6),\\operatorname{segment}(Q_6,Q_7),\\operatorname{segment}(Q_7,Q_8),\\operatorname{segment}(Q_8,Q_5)]", color: Desmos.Colors.BLUE },
      { id: "scaled-sides", latex: "[\\operatorname{segment}(Q_1,Q_5),\\operatorname{segment}(Q_2,Q_6),\\operatorname{segment}(Q_3,Q_7),\\operatorname{segment}(Q_4,Q_8)]", color: Desmos.Colors.PURPLE },
      { id: "origin", latex: "(0,0,0)", color: Desmos.Colors.RED, pointSize: 10, showLabel: true, label: "origin" },
    ],
  },
  vectors: {
    label: "Vectors in space",
    expressions: [
      { id: "u", latex: "u=\\operatorname{vector}((0,0,0),(3,1,2))", color: Desmos.Colors.BLUE },
      { id: "v", latex: "v=\\operatorname{vector}((0,0,0),(1,3,1))", color: Desmos.Colors.RED },
      { id: "sum", latex: "\\operatorname{vector}((0,0,0),(4,4,3))", color: Desmos.Colors.PURPLE },
      { id: "u-shift", latex: "\\operatorname{vector}((1,3,1),(4,4,3))", color: Desmos.Colors.BLUE },
      { id: "v-shift", latex: "\\operatorname{vector}((3,1,2),(4,4,3))", color: Desmos.Colors.RED },
      { id: "magnitude", latex: "m=\\sqrt{3^2+1^2+2^2}" },
    ],
  },
  crossSection: {
    label: "Cross sections",
    expressions: [
      { id: "height", latex: "h=0", sliderBounds: { min: "-2.9", max: "2.9", step: "0.05" } },
      { id: "ellipsoid", latex: "\\frac{x^2}{16}+\\frac{y^2}{9}+\\frac{z^2}{9}=1", color: Desmos.Colors.BLUE },
      { id: "slice", latex: "z=h", color: Desmos.Colors.RED },
      { id: "section", latex: "(4\\sqrt{1-h^2/9}\\cos(t),3\\sqrt{1-h^2/9}\\sin(t),h)", color: Desmos.Colors.PURPLE },
    ],
  },
  tangentPlane: {
    label: "Tangent plane",
    expressions: [
      { id: "surface", latex: "z=x^2+y^2", color: Desmos.Colors.BLUE },
      { id: "plane", latex: "z=2x+2y-2", color: Desmos.Colors.RED },
      { id: "touch", latex: "(1,1,2)", color: Desmos.Colors.PURPLE, pointSize: 12, showLabel: true, label: "tangent point" },
      { id: "gradient", latex: "\\operatorname{vector}((1,1,2),(3,3,1))", color: Desmos.Colors.BLACK },
    ],
  },
  spherical: {
    label: "Spherical coordinates",
    expressions: [
      { id: "radius", latex: "d=4", sliderBounds: { min: "1", max: "6", step: "0.1" } },
      { id: "theta", latex: "a=0.8", sliderBounds: { min: "0", max: "2\\pi", step: "0.02" } },
      { id: "phi", latex: "b=1", sliderBounds: { min: "0", max: "\\pi", step: "0.02" } },
      { id: "sphere", latex: "\\operatorname{sphere}((0,0,0),d)", color: Desmos.Colors.BLUE },
      { id: "point", latex: "P=(d\\sin(b)\\cos(a),d\\sin(b)\\sin(a),d\\cos(b))", color: Desmos.Colors.RED, pointSize: 12, showLabel: true, label: "P" },
      { id: "radius-vector", latex: "\\operatorname{vector}((0,0,0),P)", color: Desmos.Colors.PURPLE },
    ],
  },
  quadrics: {
    label: "Quadric surfaces",
    expressions: [
      { id: "choice", latex: "k=1", sliderBounds: { min: "1", max: "3", step: "1" } },
      { id: "ellipsoid", latex: "\\frac{x^2}{9}+\\frac{y^2}{4}+z^2=1\\{k=1\\}", color: Desmos.Colors.BLUE },
      { id: "paraboloid", latex: "z=\\frac{x^2}{4}+\\frac{y^2}{4}-2\\{k=2\\}", color: Desmos.Colors.PURPLE },
      { id: "hyperboloid", latex: "\\frac{x^2}{4}+\\frac{y^2}{4}-\\frac{z^2}{4}=1\\{k=3\\}", color: Desmos.Colors.RED },
    ],
  },
};

function loadDemo(name) {
  const demo = demos[name];
  calculator3d.setBlank();
  calculator3d.setExpressions(demo.expressions);
  document.getElementById("demo-status").textContent = `${demo.label} loaded`;
  document.querySelectorAll(".demo-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.demo === name);
  });
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const show3d = tab.dataset.tab === "3d";
    document.getElementById("panel-2d").hidden = show3d;
    document.getElementById("panel-3d").hidden = !show3d;
    document.querySelectorAll(".tab").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    requestAnimationFrame(() => (show3d ? calculator3d : calculator2d).resize());
  });
});

document.querySelectorAll(".demo-button").forEach((button) => {
  button.addEventListener("click", () => loadDemo(button.dataset.demo));
});

loadDemo("waves");

const form = document.getElementById("upload-form");
const input = document.getElementById("svg-file");
const statusOutput = document.getElementById("status");
const csrfToken = document.getElementById("csrf-token").value;

input.addEventListener("change", () => {
  statusOutput.textContent = input.files[0] ? `Selected: ${input.files[0].name}` : "Ready";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!input.files[0]) return;
  const button = form.querySelector("button");
  button.disabled = true;
  statusOutput.textContent = "Converting paths…";
  const body = new FormData();
  body.append("svg", input.files[0]);
  try {
    const response = await fetch("/api/convert", {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken },
      body,
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Unable to convert this file");
    calculator2d.setBlank();
    calculator2d.setExpressions(payload.expressions);
    calculator2d.setMathBounds(payload.bounds);
    statusOutput.textContent = `Done — created ${payload.expressions.length} equations`;
  } catch (error) {
    statusOutput.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});
