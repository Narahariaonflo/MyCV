# Infographic Generator

Automated smartphone infographic generator that compares Samsung Galaxy S26 Ultra and iPhone 17 Pro Max. A Node.js backend scrapes specifications and official-store pricing, renders a 1080×1350 px comparison image via Canvas, and exposes a REST endpoint for consumption.

## Project Overview

- **Type**: Node.js / Express backend + vanilla frontend
- **Tech**: Express, node-canvas, Cheerio, Axios
- **Purpose**: Generate side-by-side smartphone comparison infographics
- **Output**: PNG image (1080×1350 px, 4:5 aspect ratio)

## Prerequisites

- **Node.js** ≥ 18.x (LTS)
- **npm** ≥ 9.x
- System dependencies for [node-canvas](https://github.com/Automattic/node-canvas):
  - **macOS (Homebrew)**: `brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman`
  - **Ubuntu/Debian**: `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
  - **Windows**: Follow the [node-canvas Windows guide](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

## Install

```bash
cd infographic-generator
npm install
```

## Environment Setup

Copy the example environment file and adjust for your environment:

```bash
cp .env.example .env
```

Required variables (see `.env.example` for descriptions):

- `PORT` — server port (default: `3000`)
- `NODE_ENV` — `development` | `production`
- `CORS_ORIGINS` — comma-separated allowed origins
- `GSMARENA_BASE_URL` — base URL for specification scraping
- `STORE_API_BASE_URL` — base URL for pricing data

## Build

No build step required — the project runs plain JavaScript directly.

```bash
# The project is ready to run after npm install
```

## Start / Run

### Development (with auto-reload)

```bash
npm run dev
```

### Production

```bash
npm start
```

The server listens on `http://localhost:3000` (or the port set in `PORT`).

### Run Tests

```bash
npm test
```

### Test Coverage

```bash
npm run test:coverage
```

## API

### `POST /generate-infographic`

Accepts JSON body:

```json
{
  "phone1": "galaxy-s26-ultra",
  "phone2": "iphone-17-pro-max"
}
```

Returns `image/png` with a 1080×1350 px comparison infographic.

## Project Structure

```
├── public/                 # Static frontend assets
│   └── index.html          # Comparison form and image preview
├── schemas/                # JSON Schema definitions
│   ├── phone-specs.schema.json
│   └── pricing.schema.json
├── src/                    # Application source
│   ├── server.js           # Express app entry point
│   ├── composer.js         # Canvas image composer
│   └── fetchers/           # Data fetching modules
│       ├── specFetcher.js
│       └── priceFetcher.js
├── tests/                  # Test suites
│   ├── unit/               # Unit tests (Jest + nock)
│   └── integration/        # Integration tests (supertest)
├── .env.example            # Environment variable template
├── jest.config.js          # Jest configuration
├── package.json
└── README.md
```

## Design Decisions

- **Plain JavaScript** — no TypeScript compilation step; keep the stack simple.
- **JSON Schema (2020-12)** — machine-validatable contracts shared between fetchers, composer, and consumers.
- **node-canvas rendering** — server-side image generation avoids client-side font/measurement issues.
- **Nock for HTTP mocking** — deterministic unit tests without depending on live external APIs.
- **No database** — specification and pricing data are fetched on demand and rendered inline.

## License

MIT
