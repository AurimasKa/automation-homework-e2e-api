import { z } from 'zod';

/**
 * Single country entry from Supported-by-Simplex API.
 * Adjust fields if the API returns different structure.
 */
export const countrySchema = z.object({
  country: z.string(),
  country_code: z.string().optional(),
  name: z.string().optional(),
}).passthrough();

export const countriesResponseSchema = z.array(countrySchema);

export type Country = z.infer<typeof countrySchema>;
export type CountriesResponse = z.infer<typeof countriesResponseSchema>;
