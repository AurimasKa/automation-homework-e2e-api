import type { AxiosInstance, AxiosResponse } from 'axios';
import { getHttpClient } from './http';
import { env, defaultQuoteApiBaseUrl } from '../../../env';
import type { QuoteRequest, QuoteResponse } from '../schemas/quote.schema';

const QUOTE_API_BASE_URL = env.QUOTE_API_BASE_URL ?? defaultQuoteApiBaseUrl;
const QUOTE_PATH = '/api/quote';

export class SimplexClient {
  constructor(
    private readonly quoteClient: AxiosInstance = getHttpClient(QUOTE_API_BASE_URL)
  ) {}

  async createQuote(body: QuoteRequest): Promise<AxiosResponse<QuoteResponse>> {
    return this.quoteClient.post<QuoteResponse>(QUOTE_PATH, body);
  }
}

export const simplexClient = new SimplexClient();
