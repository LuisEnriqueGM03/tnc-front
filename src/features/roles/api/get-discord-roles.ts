import { apiFetch } from '@/shared/lib/api';
import { discordRolesSchema, type DiscordRole } from '../types/role.types';

export async function getDiscordRoles(token: string): Promise<DiscordRole[]> {
  const raw = await apiFetch<unknown>('/auth/discord/roles', { token });
  const parsed = discordRolesSchema.safeParse(raw);
  return parsed.success ? parsed.data : [];
}
