# desmos-lab

A Flask web application that converts supported SVG geometry into point-list expressions for Desmos and provides interactive mathematics learning tools.

## Features

### SVG 2D

- Upload an `.svg` file up to 2 MB.
- Convert `path`, `line`, `polyline`, `polygon`, `rect`, `circle`, and `ellipse` elements.
- Support `matrix`, `translate`, `scale`, `rotate`, `skewX`, and `skewY` transforms.
- Read inherited and inline `stroke`, `fill`, `opacity`, and `stroke-opacity` values.
- Convert separate SVG subpaths into separate Desmos expressions.
- Sample curves into points, normalize the result, and invert the SVG Y-axis for graph display.
- Prefer `stroke` for expression colors, falling back to `fill`.

The converter is exposed through `POST /api/convert`. Requests require a CSRF token and return `expressions` plus fixed Desmos graph bounds.

### 3D Demos

The 3D tab uses the Desmos 3D Calculator and includes ten examples:

- Wave surface
- Sphere and plane
- Parametric helix
- Rotating cube
- Scaling a model
- Vectors in space
- Cross sections
- Tangent plane
- Spherical coordinates
- Quadric surfaces

### Equation Lab

Six equation-drawing lessons cover lines, domain restrictions, circles, parabolas, absolute-value graphs, and a smiley face. Each lesson supports hints, answer checking, solutions, and reset. Progress is stored in the browser under `equationLabProgress`.

### Marble Lab

Three challenges ask users to shape a track using linear, quadratic, and absolute-value functions. Adjust the parameters, launch the marble, and collect every star. Progress is stored in the browser under `marbleLabProgress`.

## Setup

Create a virtual environment, install the application dependencies, and create the local environment file:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
```

If the environment was moved from another directory and reports `bad interpreter`, recreate it:

```bash
deactivate 2>/dev/null || true
rm -rf .venv
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Configure `.env`:

```dotenv
DESMOS_API_KEY=
FLASK_SESSION_SECRET=
PORT=8000
FLASK_DEBUG=false
```

Request a Desmos API key at <https://www.desmos.com/my-api> and set `DESMOS_API_KEY` to the key itself, not the complete calculator script URL. Generate a session secret with:

```bash
openssl rand -hex 32
```

Start the application:

```bash
python app.py
```

Open <http://127.0.0.1:8000>. To use another port, change `PORT` in `.env` or run:

```bash
PORT=8080 python app.py
```

## Deploy to Vercel

This project uses Vercel's Python runtime and exposes the Flask `app` from `app.py`.

1. Install the Vercel CLI and sign in:

   ```bash
   npm install -g vercel
   vercel login
   ```

2. From the project directory, link the project and add the production environment variables:

   ```bash
   vercel link
   vercel env add DESMOS_API_KEY production
   vercel env add FLASK_SESSION_SECRET production
   ```

   Enter the values when prompted. Use the Desmos API key itself for `DESMOS_API_KEY` and a persistent random value for `FLASK_SESSION_SECRET`.

3. Deploy to production:

   ```bash
   vercel --prod
   ```

Vercel will print the public deployment URL. The application is serverless, so uploaded files and browser progress are not stored on the server between requests. `Equation Lab` and `Marble Lab` progress is saved locally in each user's browser.

## Testing

The tests use pytest, which is not an application dependency. Install it in the virtual environment before running the suite:

```bash
python -m pip install pytest
python -m pytest -q
```

## Security and limitations

- Without `DESMOS_API_KEY`, the page shows a warning, does not load the Desmos calculators, and disables SVG conversion.
- Upload requests use CSRF protection and are limited to 2 MB.
- If `FLASK_SESSION_SECRET` is omitted, a temporary random secret is generated at startup. Use a persistent cryptographically random value in production.
- Keep `FLASK_DEBUG=false` in production and use a production WSGI server instead of Flask's development server.
- Keep `.env` private. It is ignored by Git; `.env.example` contains no credentials.
- The Desmos calculator script is loaded dynamically without a fixed SRI digest.
- Stroke widths, text, clip paths, masks, percentage colors, named CSS colors, and external stylesheets are not converted.
- Closed areas are not filled; output consists of sampled line segments.
- Production deployment should add rate limiting.
