import type { MeResponse } from '../types/auth.types';

export async function getMe(): Promise<MeResponse> {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    return { authenticated: false };
  }

  return (await response.json()) as MeResponse;
}
