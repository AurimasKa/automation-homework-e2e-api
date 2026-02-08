import { z } from 'zod';

const quoteRequestSchema = z.object({
  source_amount: z.number(),
  source_currency: z.string(),
  target_currency: z.string(),
  uid: z.string(),
  abTests: z.record(z.unknown()).optional(),
  hostname: z.string(),
}).passthrough();

export const quoteResponseSchema = z.object({
  quote_id: z.string().optional(),
  source_amount: z.number().optional(),
  source_currency: z.string().optional(),
  target_amount: z.number().optional(),
  target_currency: z.string().optional(),
  valid_until: z.string().optional(),
}).passthrough();

export const errorResponseSchema = z.object({
  error: z.string().optional(),
  message: z.string().optional(),
  code: z.union([z.string(), z.number()]).optional(),
}).passthrough();

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
export type QuoteResponse = z.infer<typeof quoteResponseSchema>;
