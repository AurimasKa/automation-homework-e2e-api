import type { QuoteRequest } from '../schemas/quote.schema';

export const validQuotePayload: QuoteRequest = {
  source_amount: 300,
  source_currency: 'EUR',
  target_currency: 'ADA',
  uid: '1459ea5c-1b80-4235-9ed0-5bb59a14061c',
  abTests: {},
  hostname: 'https://buy.simplex.com/',
};

export const invalidQuotePayloadMissingFields = {
  source_amount: 300,
  source_currency: 'EUR',
} as unknown as QuoteRequest;

export const invalidQuotePayloadWrongTypes = {
  source_amount: '300',
  source_currency: 'EUR',
  target_currency: 'ADA',
  uid: 123,
  abTests: {},
  hostname: 'https://buy.simplex.com/',
} as unknown as QuoteRequest;
