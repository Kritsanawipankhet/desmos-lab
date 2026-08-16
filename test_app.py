import io
import re

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
