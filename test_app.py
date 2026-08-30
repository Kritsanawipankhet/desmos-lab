import io
import re
from pathlib import Path

from app import app


def _csrf_token(client) -> str:
    response = client.get("/")
    match = re.search(rb'id="csrf-token"[^>]+value="([^"]+)"', response.data)
    assert match is not None
    return match.group(1).decode()


def test_convert_rejects_request_without_csrf_token():
    client = app.test_client()
    response = client.post(
        "/api/convert",
        data={"svg": (io.BytesIO(b"<svg/>"), "image.svg")},
    )
    assert response.status_code == 400
    assert response.json["error"].startswith("CSRF validation failed")


def test_desmos_script_uses_configured_api_key_without_stale_integrity(monkeypatch):
    monkeypatch.setenv("DESMOS_API_KEY", "test-key")
    client = app.test_client()
    response = client.get("/")
    assert b"https://www.desmos.com/api/v1.12/calculator.js?apiKey=test-key" in response.data
    assert b'integrity="sha384-' not in response.data


def test_upload_status_uses_accessible_output_element():
    client = app.test_client()
    response = client.get("/")
    assert b'<output id="status" aria-live="polite">Ready</output>' in response.data
    assert b'role="status"' not in response.data


def test_page_has_2d_3d_and_learning_tabs():
    client = app.test_client()
    response = client.get("/")
    assert b'data-tab="overview"' in response.data
    assert b'data-tab="2d"' in response.data
    assert b'data-tab="3d"' in response.data
    assert b'data-tab="learn"' in response.data
    assert b'id="calculator-2d"' in response.data
    assert b'id="calculator-3d"' in response.data
    assert b'id="calculator-learn"' in response.data
    assert b'id="panel-overview"' in response.data
    assert b'data-open-tab="learn"' in response.data
    assert b'id="lesson-list"' in response.data
    assert b'id="check-answer"' in response.data
    assert b'id="show-solution"' in response.data
    assert b'data-demo="rotation"' in response.data
    assert b'data-demo="scaling"' in response.data
    assert b'data-demo="vectors"' in response.data
    assert b'data-demo="crossSection"' in response.data
    assert b'data-demo="tangentPlane"' in response.data
    assert b'data-demo="spherical"' in response.data
    assert b'data-demo="quadrics"' in response.data


def test_3d_demos_enable_function_keypad():
    javascript = Path("static/app.js").read_text()
    calculator_options = javascript.split("const calculator3d", 1)[1].split("});", 1)[0]
    assert "keypad: true" in calculator_options


def test_equation_lab_has_lessons_and_local_progress():
    javascript = Path("static/app.js").read_text()
    assert "const lessons = [" in javascript
    assert 'localStorage.getItem("equationLabProgress")' in javascript
    assert 'calculatorLearn.getExpressions()' in javascript
    assert '.replace(/\\\\left|\\\\right/g, "")' in javascript
    assert '.replace(/\\\\lvert|\\\\rvert/g, "|")' in javascript
    assert '.replace(/\\^\\{([^{}]+)\\}/g, "^$1")' in javascript
    assert 'calculatorLearn.setExpressions(lesson.solution' in javascript
    assert 'latex: "y=2\\\\left\\\\{-3<x<3\\\\right\\\\}"' in javascript
    assert 'latex: "y=\\\\left|x-1\\\\right|-1"' in javascript
    assert 'latex: "y=-0.25x^2-1\\\\left\\\\{-2<x<2\\\\right\\\\}"' in javascript


def test_convert_accepts_valid_csrf_token():
    client = app.test_client()
    token = _csrf_token(client)
    response = client.post(
        "/api/convert",
        data={
            "svg": (
                io.BytesIO(b'<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0L1 1"/></svg>'),
                "image.svg",
            )
        },
        headers={"X-CSRFToken": token},
    )
    assert response.status_code == 200
    assert len(response.json["expressions"]) == 1
