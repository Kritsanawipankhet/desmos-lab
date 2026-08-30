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

const calculatorLearn = Desmos.GraphingCalculator(document.getElementById("calculator-learn"), {
  expressionsCollapsed: false,
  settingsMenu: false,
  keypad: true,
  showGrid: true,
  showXAxis: true,
  showYAxis: true,
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

const calculators = { "2d": calculator2d, "3d": calculator3d, learn: calculatorLearn };

function selectTab(name) {
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.hidden = panel.id !== `panel-${name}`;
  });
  document.querySelectorAll(".tab").forEach((item) => {
    const active = item.dataset.tab === name;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
  });
  if (calculators[name]) requestAnimationFrame(() => calculators[name].resize());
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
});

document.querySelectorAll("[data-open-tab]").forEach((button) => {
  button.addEventListener("click", () => selectTab(button.dataset.openTab));
});

document.querySelectorAll(".demo-button").forEach((button) => {
  button.addEventListener("click", () => loadDemo(button.dataset.demo));
});

loadDemo("waves");

const lessonTarget = (shapes) => `
  <svg viewBox="-6 -6 12 12" role="img" aria-label="Graph to recreate">
    <g transform="scale(1,-1)">${shapes}</g>
  </svg>`;

const lessons = [
  {
    title: "The first line",
    short: "Straight line",
    objective: "Write an equation for the line y = x + 1.",
    hints: ["A straight line has the form y = mx + b.", "Use slope m = 1 and y-intercept b = 1.", "Try: y = x + 1"],
    solution: [{ latex: "y=x+1" }],
    target: lessonTarget('<line x1="-6" y1="-5" x2="5" y2="6" />'),
    bounds: { left: -6, right: 6, bottom: -6, top: 6 },
    check: (latex) => latex.some((value) => /^y=x\+1$/.test(value)),
  },
  {
    title: "A bounded segment",
    short: "Domain",
    objective: "Draw y = 2 from x = -3 to x = 3 only.",
    hints: ["Use braces to restrict where a graph appears.", "Put an inequality for x after y = 2.", "Try: y = 2 {-3 < x < 3}"],
    solution: [{ latex: "y=2\\left\\{-3<x<3\\right\\}" }],
    target: lessonTarget('<line x1="-3" y1="2" x2="3" y2="2" />'),
    bounds: { left: -6, right: 6, bottom: -4, top: 6 },
    check: (latex) => latex.some((value) => value.startsWith("y=2\\{") && value.includes("-3<x<3")),
  },
  {
    title: "A centered circle",
    short: "Circle",
    objective: "Draw a circle centered at the origin with radius 3.",
    hints: ["A circle uses both x² and y².", "For a circle at the origin: x² + y² = r².", "Try: x² + y² = 9"],
    solution: [{ latex: "x^2+y^2=9" }],
    target: lessonTarget('<circle cx="0" cy="0" r="3" />'),
    bounds: { left: -6, right: 6, bottom: -6, top: 6 },
    check: (latex) => latex.some((value) => /^(x\^2\+y\^2=9|y\^2\+x\^2=9)$/.test(value)),
  },
  {
    title: "A rising parabola",
    short: "Parabola",
    objective: "Draw an upward parabola whose vertex is (0, -2).",
    hints: ["Start with the parent function y = x².", "Moving a graph down means subtracting outside the square.", "Try: y = x² - 2"],
    solution: [{ latex: "y=x^2-2" }],
    target: lessonTarget('<path d="M-2.8 5.84 Q-1.4 -2 0 -2 Q1.4 -2 2.8 5.84" />'),
    bounds: { left: -6, right: 6, bottom: -4, top: 7 },
    check: (latex) => latex.some((value) => /^y=x\^2-2$/.test(value)),
  },
  {
    title: "Absolute-value valley",
    short: "Absolute value",
    objective: "Create a V shape with vertex at (1, -1).",
    hints: ["The parent graph is y = |x|.", "Replace x with x - 1, then move the graph down 1.", "Try: y = |x - 1| - 1"],
    solution: [{ latex: "y=\\left|x-1\\right|-1" }],
    target: lessonTarget('<polyline points="-5,5 1,-1 6,4" />'),
    bounds: { left: -6, right: 6, bottom: -4, top: 7 },
    check: (latex) => latex.includes("y=|x-1|-1"),
  },
  {
    title: "Build a smile",
    short: "Mini picture",
    objective: "Combine a radius-4 face, two eye points at (-1.5, 1) and (1.5, 1), and the mouth y = -0.25x² - 1 for -2 < x < 2.",
    hints: ["This challenge needs four expressions: one circle, two points, and one restricted parabola.", "Enter each eye as a coordinate on its own row.", "Circle: x²+y²=16. Mouth: y=-0.25x²-1 {-2<x<2}"],
    solution: [
      { latex: "x^2+y^2=16", color: Desmos.Colors.BLUE },
      { latex: "(-1.5,1)", color: Desmos.Colors.RED, pointSize: 9 },
      { latex: "(1.5,1)", color: Desmos.Colors.RED, pointSize: 9 },
      { latex: "y=-0.25x^2-1\\left\\{-2<x<2\\right\\}", color: Desmos.Colors.PURPLE },
    ],
    target: lessonTarget('<circle cx="0" cy="0" r="4"/><circle class="filled" cx="-1.5" cy="1" r=".18"/><circle class="filled" cx="1.5" cy="1" r=".18"/><path d="M-2 -2 Q0 -1 2 -2"/>'),
    bounds: { left: -5.5, right: 5.5, bottom: -5.5, top: 5.5 },
    check: (latex) => {
      const circle = latex.includes("x^2+y^2=16") || latex.includes("y^2+x^2=16");
      const eyes = latex.includes("(-1.5,1)") && latex.includes("(1.5,1)");
      const mouth = latex.some((value) => value.includes("y=-0.25x^2-1") && value.includes("-2<x<2"));
      return circle && eyes && mouth;
    },
  },
];

function savedLessonProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem("equationLabProgress") || "[]");
    return Array.isArray(saved) ? saved.filter((index) => Number.isInteger(index) && index >= 0 && index < lessons.length) : [];
  } catch (_error) {
    return [];
  }
}

const completedLessons = new Set(savedLessonProgress());
let activeLesson = 0;
let hintLevel = 0;

function userLatex() {
  return calculatorLearn.getExpressions()
    .filter((expression) => expression.type === "expression" && expression.latex)
    .map((expression) => expression.latex
      .replace(/\\ /g, "")
      .replace(/\\left|\\right/g, "")
      .replace(/\\lvert|\\rvert/g, "|")
      .replace(/\^\{([^{}]+)\}/g, "^$1")
      .replace(/\\le/g, "<")
      .replace(/\\ge/g, ">")
      .replace(/\s/g, ""));
}

function renderLessonList() {
  const list = document.getElementById("lesson-list");
  list.replaceChildren(...lessons.map((lesson, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `lesson-chip${index === activeLesson ? " is-active" : ""}${completedLessons.has(index) ? " is-complete" : ""}`;
    button.innerHTML = `<span>${completedLessons.has(index) ? "✓" : index + 1}</span>${lesson.short}`;
    button.addEventListener("click", () => loadLesson(index));
    return button;
  }));
  document.getElementById("course-progress").textContent = `${completedLessons.size} / ${lessons.length} complete`;
}

function loadLesson(index) {
  activeLesson = index;
  hintLevel = 0;
  const lesson = lessons[index];
  document.getElementById("lesson-number").textContent = `Lesson ${index + 1} of ${lessons.length}`;
  document.getElementById("lesson-title").textContent = lesson.title;
  document.getElementById("lesson-objective").textContent = lesson.objective;
  document.getElementById("target-picture").innerHTML = lesson.target;
  document.getElementById("lesson-hint").textContent = "Try it first, then ask for a hint.";
  document.getElementById("lesson-feedback").textContent = "Enter an equation to begin.";
  document.getElementById("lesson-feedback").className = "";
  document.getElementById("lesson-state").textContent = completedLessons.has(index) ? "Completed" : "Not completed";
  calculatorLearn.setBlank();
  calculatorLearn.setMathBounds(lesson.bounds);
  renderLessonList();
}

document.getElementById("show-hint").addEventListener("click", () => {
  const lesson = lessons[activeLesson];
  document.getElementById("lesson-hint").textContent = lesson.hints[Math.min(hintLevel, lesson.hints.length - 1)];
  hintLevel += 1;
});

document.getElementById("show-solution").addEventListener("click", () => {
  const lesson = lessons[activeLesson];
  calculatorLearn.setBlank();
  calculatorLearn.setExpressions(lesson.solution.map((expression, index) => ({
    id: `solution-${activeLesson}-${index}`,
    ...expression,
  })));
  calculatorLearn.setMathBounds(lesson.bounds);
  const feedback = document.getElementById("lesson-feedback");
  feedback.textContent = "Solution displayed. Study how each equation builds the target, then start over to try it yourself.";
  feedback.className = "is-solution";
});

document.getElementById("reset-lesson").addEventListener("click", () => loadLesson(activeLesson));

document.getElementById("check-answer").addEventListener("click", () => {
  const feedback = document.getElementById("lesson-feedback");
  if (lessons[activeLesson].check(userLatex())) {
    completedLessons.add(activeLesson);
    localStorage.setItem("equationLabProgress", JSON.stringify([...completedLessons]));
    feedback.textContent = activeLesson === lessons.length - 1 ? "Excellent — you completed the course!" : "Correct! Choose the next lesson when you are ready.";
    feedback.className = "is-success";
    document.getElementById("lesson-state").textContent = "Completed";
    renderLessonList();
  } else {
    feedback.textContent = "Not quite yet. Compare your graph with the target or reveal another hint.";
    feedback.className = "is-error";
  }
});

loadLesson(0);

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
