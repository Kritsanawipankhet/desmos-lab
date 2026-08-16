const calculator = Desmos.GraphingCalculator(document.getElementById("calculator"), {
  expressionsCollapsed: false,
  settingsMenu: false,
  keypad: false,
  showGrid: true,
  showXAxis: true,
  showYAxis: true,
});

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
    calculator.setBlank();
    calculator.setExpressions(payload.expressions);
    calculator.setMathBounds(payload.bounds);
    statusOutput.textContent = `Done — created ${payload.expressions.length} equations`;
  } catch (error) {
    statusOutput.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});
