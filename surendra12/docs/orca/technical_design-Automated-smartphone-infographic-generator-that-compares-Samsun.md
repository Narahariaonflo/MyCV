# technical_design: Automated smartphone infographic generator that compares Samsung Galaxy S26 Ultra and iPhone 17 Pro Max. A Node.js backe

Status: draft

## riskNotes

- Scraping reliability: GSMArena or store pages may change structure; implement robust selectors and fallback. Product renders: placeholder images will be used for MVP; long-term use licensed renders. Aspect ratio enforcement and text alignment may require pixel-perfect tuning.

## backendPlan

- Node.js/Express service. Core modules: fetchers/ (specFetcher.js, priceFetcher.js), composer.js, server.js. Use helmet, cors, express-rate-limit for production readiness. All external calls mocked in tests. Image output: 1080x1350 pixels (4:5). Product renders: placeholder silver images stored as assets. Font: Noto Sans for clean typography.

## agentHandoff

- To backend agent: Implement server and data fetchers with exact API contract (POST /generate-infographic, accepts { phone1: 'galaxy-s26-ultra', phone2: 'iphone-17-pro-max' }, returns image/png). To frontend agent: Create public/index.html with form and image placeholder; script calls API and inserts result. Both agents coordinate via predicted file paths to avoid conflicts.

## databasePlan

- No database needed.

## frontendPlan

- Static HTML/CSS/JS page served from public/. Vanilla fetch to API, minimal styling (white background, centered button, image preview). No build tools. Mobile-responsive fallback.

## testStrategy

- Unit tests with Jest + nock: mock GSMArena and store HTML responses to validate fetcher output; test image composer for correct dimensions and text content using canvas toDataURL; integration test with supertest to assert endpoint returns 200 and image/png. Reviewer will run `npm test` from infographic-generator/ directory.

## dependencyPlan

- No external services with credentials required. All integrations are public websites. Fallback logic reduces dependency on single source.

## lowLevelDesign

- Backend: Express server with routes /generate-infographic (POST) and static file serving. Data fetchers use axios + cheerio for GSMArena (specs) and official Indian stores (prices). Image composition uses node-canvas to draw a white background, two columns, bold red titles, spec text, and product placeholders. Fallback scraping from Amazon India if primary price fails; error returned if all fail. No database – stateless generation. Frontend: Single HTML page with a button that POSTs to /generate-infographic and displays returned PNG.

## blockedOnIntegrations


## implementationRoadmap

- Scaffold project structure, install deps, define JSON schemas for spec and price data.
- Build backend: server, spec fetcher, price fetcher, image composer, and endpoint with error handling.
- Build frontend: simple UI to trigger generation and display image.
- Write comprehensive unit and integration tests.
- Code freeze, review, and acceptance.

## implementationApproach

- Scaffold a new /infographic-generator directory in the existing MyCV repository. Use npm for dependency management. Implement backend-first, then frontend. Testing with Jest and supertest; mock HTTP responses with nock. Manual QA by reviewer via curl / browser (but reviewer gate is automated tests + shell; we rely on integration tests).
