# SVG to Desmos

A Flask web application that converts SVG geometry into point-list expressions and renders them with the Desmos Graphing Calculator API v1.12.

## Getting started

Create a virtual environment, install the dependencies, and create your local environment file:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Configure `.env` before starting the application:

```dotenv
DESMOS_API_KEY=
FLASK_SESSION_SECRET=
PORT=8000
FLASK_DEBUG=false
```

Request a Desmos API key at <https://www.desmos.com/my-api>. Set `DESMOS_API_KEY` to the key itself, not the complete calculator script URL.

Generate a session secret and paste the result after `FLASK_SESSION_SECRET=`:

```bash
openssl rand -hex 32
```

Start the application:

```bash
python app.py
```

Open <http://127.0.0.1:8000> and upload an `.svg` file.

Port `8000` is used by default because macOS may reserve port `5000` for AirPlay Receiver. To use another port, change `PORT` in `.env` or run:

```bash
PORT=8080 python app.py
```

## Environment and security

- If `DESMOS_API_KEY` is missing, the page displays a warning and does not load the Desmos calculator.
- The Desmos calculator script is served dynamically by Desmos, so it is loaded without a fixed Subresource Integrity digest. A stale digest would cause browsers to block the API entirely.
- Keep `.env` private. It is ignored by Git, while `.env.example` contains no credentials and can be committed safely.
- Set `FLASK_SESSION_SECRET` to a persistent, cryptographically random value in production. If omitted, the application creates a temporary value whenever the process starts.
- Keep `FLASK_DEBUG=false` in production. Set it to `true` only when local auto-reloading and debugging are required.
- Upload requests are protected with CSRF tokens and limited to 2 MB.

## MVP capabilities and limitations

- Supports SVG `path`, `line`, `polyline`, `polygon`, `rect`, `circle`, and `ellipse` elements.
- Supports common SVG transforms and inherited `stroke`, `fill`, and opacity values.
- Converts separate SVG subpaths into separate Desmos expressions to prevent unwanted connecting lines.
- Approximates curves with sampled points joined by Desmos line segments.
- Uses SVG `stroke` as the expression color, falling back to `fill`; it does not fill enclosed areas.
- Does not currently convert stroke widths, text, clip paths, masks, percentage colors, named CSS colors, or external stylesheets.
- A production deployment should add rate limiting and run behind a production WSGI server rather than Flask's development server.
