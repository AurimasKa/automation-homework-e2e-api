function getEnv(key: string): string | undefined {
  return process.env[key];
}

export const env = {
  get API_BASE_URL(): string | undefined {
    return getEnv('API_BASE_URL');
  },
  get QUOTE_API_BASE_URL(): string | undefined {
    return getEnv('QUOTE_API_BASE_URL');
  },
  get BASE_URL(): string | undefined {
    return getEnv('BASE_URL');
  },
} as const;

export const defaultApiBaseUrl = 'https://api.simplexcc.com/v2';
export const defaultQuoteApiBaseUrl = 'https://iframe.simplex-affiliates.com';
export const defaultBaseUrl = 'https://simplex.com';
