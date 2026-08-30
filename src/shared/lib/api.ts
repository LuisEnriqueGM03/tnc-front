import { env } from '@/shared/config/env';
import { ApiError } from './errors';

export interface ApiFetchOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined>;
  token?: string;
  body?: unknown;
}

interface ErrorResponse {
  message?: unknown;
  code?: unknown;
}

export async function apiFetch<TResponse>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<TResponse> {
  const { params, token, headers, body, ...restOptions } = options;

  let url = `${env.NEXT_PUBLIC_API_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const authHeader: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    ...restOptions,
  });

  if (!response.ok) {
    const errorBody = (await safeJson(response)) as ErrorResponse;
    const message =
      typeof errorBody.message === 'string'
        ? errorBody.message
        : 'Error en la comunicación con el servidor';
    const code = typeof errorBody.code === 'string' ? errorBody.code : undefined;
    throw new ApiError(message, response.status, code ?? 'API_ERROR');
  }

  return (await safeJson(response)) as TResponse;
}

async function safeJson(response: Response): Promise<unknown> {
  const text = await response.text();

  if (text.length === 0) {
    return {};
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return {};
  }
}

export async function apiGet<TResponse>(
  endpoint: string,
  options: Omit<ApiFetchOptions, 'method'> = {}
): Promise<TResponse> {
  return apiFetch<TResponse>(endpoint, { ...options, method: 'GET' });
}

export async function apiPost<TResponse>(
  endpoint: string,
  body: unknown,
  options: Omit<ApiFetchOptions, 'method' | 'body'> = {}
): Promise<TResponse> {
  return apiFetch<TResponse>(endpoint, { ...options, method: 'POST', body });
}

export async function apiPut<TResponse>(
  endpoint: string,
  body: unknown,
  options: Omit<ApiFetchOptions, 'method' | 'body'> = {}
): Promise<TResponse> {
  return apiFetch<TResponse>(endpoint, { ...options, method: 'PUT', body });
}

export async function apiDelete<TResponse>(
  endpoint: string,
  options: Omit<ApiFetchOptions, 'method'> = {}
): Promise<TResponse> {
  return apiFetch<TResponse>(endpoint, { ...options, method: 'DELETE' });
}

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && error.statusCode === 401;
}
