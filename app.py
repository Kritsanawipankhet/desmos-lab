import os
import secrets

from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
from flask_wtf.csrf import CSRFError, CSRFProtect

from converter import convert_svg

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024
app.secret_key = os.getenv("FLASK_SESSION_SECRET") or secrets.token_hex(32)
app.config["WTF_CSRF_TIME_LIMIT"] = 3600
csrf = CSRFProtect(app)


@app.get("/")
def index():
    return render_template(
        "index.html", desmos_api_key=os.getenv("DESMOS_API_KEY", "").strip()
    )


@app.post("/api/convert")
def convert():
    upload = request.files.get("svg")
    if upload is None or not upload.filename.lower().endswith(".svg"):
        return jsonify(error="Please choose an .svg file"), 400
    try:
        return jsonify(convert_svg(upload.read()))
    except ValueError as exc:
        return jsonify(error=str(exc)), 400


@app.errorhandler(413)
def too_large(_error):
    return jsonify(error="The file is larger than 2 MB"), 413


@app.errorhandler(CSRFError)
def csrf_error(error):
    return jsonify(error=f"CSRF validation failed: {error.description}"), 400


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    debug = os.getenv("FLASK_DEBUG", "false").lower() in {"1", "true", "yes"}
    app.run(host="127.0.0.1", port=port, debug=debug)
