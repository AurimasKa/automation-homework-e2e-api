# Node 20 (matches .nvmrc). Bookworm has glibc required by Playwright browsers.
FROM node:20-bookworm

WORKDIR /app

# Install deps from lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci

# Install Chromium and system deps only (matches CI project)
RUN npx playwright install --with-deps chromium

COPY . .

ENV CI=1

# Run tests by default. Use --init and --ipc=host when running (see README or docker-compose).
CMD ["npm", "test"]
