import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiFetch, isUnauthorizedError, type ApiFetchOptions } from './api';
import { SESSION_COOKIE_NAME } from '@/shared/config/session';

export async function apiFetchServer<TResponse>(
  endpoint: string,
  options: Omit<ApiFetchOptions, 'token'> = {}
): Promise<TResponse> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  try {
    return await apiFetch<TResponse>(endpoint, {
      ...options,
      ...(token ? { token } : {}),
    });
  } catch (error) {
    if (isUnauthorizedError(error)) {
      redirect('/login');
    }
    throw error;
  }
}
