# Automation Homework (E2E + API)

Playwright-based E2E tests and API tests. Target: [simplex.com](https://simplex.com).

## Folder structure

```
automation-homework-e2e-api/
├── fixtures/
│   └── basic.fixture.ts       # Playwright test/expect export
├── page-objects/
│   ├── page-object.ts         # Base page object
│   ├── pages/                 # Page objects by flow
│   │   └── simplex/           # Simplex buy-crypto flow
│   └── components/            # Reusable components
├── tests/
│   └── ui/                    # E2E specs (to be added)
├── utils/
│   └── test-step.ts           # @TestStep decorator for test.step
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

## Run tests

```bash
npm test
```

Optional: set `BASE_URL` (defaults to `https://simplex.com`):

```bash
BASE_URL=https://simplex.com npm test
```

## View report

```bash
npm run report
```

## CI

Tests run on GitHub Actions on push and pull requests to `main` or `master` (see [.github/workflows/ci.yml](.github/workflows/ci.yml)).
