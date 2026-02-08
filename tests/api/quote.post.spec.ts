import { test, expect } from '@playwright/test';
import { simplexClient } from '../../src/api/client/simplex.client';
import { quoteResponseSchema, errorResponseSchema } from '../../src/api/schemas/quote.schema';
import {
  validQuotePayload,
  invalidQuotePayloadMissingFields,
  invalidQuotePayloadWrongTypes,
} from '../../src/api/test-data/payloads';

test.describe('Quote API (Wallet)', () => {
  test('POST quote with valid payload returns 200/201 with valid response or 401 when unauthorized', async () => {
    const body = validQuotePayload;

    let response: Awaited<ReturnType<typeof simplexClient.createQuote>>;
    try {
      response = await simplexClient.createQuote(body);
    } catch (err: unknown) {
      response = (err as { response?: Awaited<ReturnType<typeof simplexClient.createQuote>> }).response!;
    }

    expect([200, 201, 401]).toContain(response.status);

    if (response.status === 200 || response.status === 201) {
      const parsed = quoteResponseSchema.safeParse(response.data);
      expect(parsed.success).toBe(true);
    }
    if (response.status === 401) {
      expect(response.data).toBeDefined();
    }
  });

  test('POST quote with invalid payload (missing required fields) returns 4xx', async () => {
    const body = invalidQuotePayloadMissingFields;

    const response = await simplexClient.createQuote(body).catch((err) => err.response);

    expect(response).toBeDefined();
    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.status).toBeLessThan(500);
    if (response.data && typeof response.data === 'object') {
      errorResponseSchema.safeParse(response.data);
    }
  });

  test('POST quote with invalid payload (wrong types) returns 4xx', async () => {
    const body = invalidQuotePayloadWrongTypes;
    const response = await simplexClient.createQuote(body).catch((err) => err.response);

    expect(response).toBeDefined();
    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.status).toBeLessThan(500);
  });
});
