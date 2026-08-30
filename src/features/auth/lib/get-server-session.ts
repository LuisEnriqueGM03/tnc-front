import { redirect } from 'next/navigation';
import { apiFetchServer } from '@/shared/lib/api-server';
import { apiUserSchema, type SessionUser } from '../types/auth.types';

export async function getServerSession(): Promise<SessionUser> {
  const raw = await apiFetchServer<unknown>('/auth/me');
  const parsed = apiUserSchema.safeParse(raw);

  if (!parsed.success) {
    redirect('/login');
  }

  return parsed.data;
}
