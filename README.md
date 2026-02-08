# Automation Homework (E2E + API)

Playwright-based E2E tests and API tests. Target: [simplex.com](https://simplex.com).

## Folder structure

```
automation-homework-e2e-api/
├── env.ts                           # BASE_URL, QUOTE_API_BASE_URL, API_BASE_URL
├── src/
│   ├── api/
│   │   ├── client/
│   │   │   ├── http.ts
│   │   │   └── simplex.client.ts
│   │   ├── schemas/
│   │   │   └── quote.schema.ts
│   │   └── test-data/
│   │       └── payloads.ts
│   └── ui/
│       ├── PageObject.ts
│       ├── pages/                   # HomePage, BuyCryptoPage, PaymentMethodPage, etc.
│       ├── components/              # CookieConsentBanner, LanguageSelector, etc.
│       ├── selectors/
│       ├── test-data/
│       └── utils/
├── tests/
│   ├── api/
│   │   └── quote.post.spec.ts
│   └── ui/
│       ├── fixtures/
│       │   └── basic.fixture.ts
│       └── *.spec.ts
├── fixtures/
│   └── basic.fixture.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Prerequisites

- Node.js (v18+)
- npm

## Setup

```bash
npm install
npx playwright install
```

Optional: set env vars for overrides (see [Run tests](#run-tests)).

## Run tests

- **All tests** (API + E2E): `npm test`
- **API only**: `npm run test:api`
- **E2E only**: `npm run test:e2e`
- **UI mode**: `npm run test:ui`
- **Report**: `npm run report`

Env (optional):

| Variable | Default | Use |
|----------|---------|-----|
| `BASE_URL` | `https://simplex.com` | UI E2E base URL |
| `QUOTE_API_BASE_URL` | `https://iframe.simplex-affiliates.com` | Quote API base |
| `API_BASE_URL` | `https://api.simplexcc.com/v2` | Generic API client base |

```bash
BASE_URL=https://simplex.com npm test
QUOTE_API_BASE_URL=https://iframe.simplex-affiliates.com npm run test:api
```

## API tests

API tests use **Playwright Test** with **Axios** and **Zod** (no browser).

- **POST** `/api/quote` (Wallet API) — valid payload → 200/201 or 401; invalid payload → 4xx. Response validated with Zod when status is 2xx.

## View report

Run tests and open the **rich HTML report** in your browser:

```bash
npm run test:open-report
```

Or open the last generated report (after running `npm test`):

```bash
npm run report
```

## CI

Tests run on GitHub Actions on push and pull requests (see [.github/workflows/ci.yml](.github/workflows/ci.yml)). The pipeline runs API and E2E projects and uploads the HTML report and test results as artifacts.
