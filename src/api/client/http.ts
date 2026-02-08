import axios, { type AxiosInstance } from 'axios';
import { env, defaultApiBaseUrl } from '../../../env';

const defaultBaseURL = env.API_BASE_URL ?? defaultApiBaseUrl;

function createHttpClient(baseURL: string = defaultBaseURL): AxiosInstance {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 30_000,
  });
}

const http = createHttpClient(defaultBaseURL);

export function getHttpClient(baseURL?: string): AxiosInstance {
  return baseURL ? createHttpClient(baseURL) : http;
}
