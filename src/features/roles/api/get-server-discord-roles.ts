import { cookies } from 'next/headers';
import { apiFetch } from '@/shared/lib/api';
import { SESSION_COOKIE_NAME } from '@/shared/config/session';
import { discordRolesSchema, type DiscordRole } from '../types/role.types';

export async function getServerDiscordRoles(): Promise<DiscordRole[]> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return [];
  }

  try {
    const raw = await apiFetch<unknown>('/auth/discord/roles', { token });
    const parsed = discordRolesSchema.safeParse(raw);
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}
