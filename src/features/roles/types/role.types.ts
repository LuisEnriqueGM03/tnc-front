import { z } from 'zod';

export type RolNivel = 'admin' | 'moderador' | 'miembro';

export type PermisoKey = 'admin' | 'actividades' | 'recordatorios' | 'logs' | 'miembros';

export interface DiscordRole {
  id: string;
  name: string;
  color: number;
  position: number;
}

export const discordRoleSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  color: z.number().int(),
  position: z.number().int(),
});

export const discordRolesSchema = z.array(discordRoleSchema);

export interface RolConfig {
  id: string;
  nivel: RolNivel;
  nombres: readonly string[];
  ids: readonly string[];
  colorToken: string;
  permisos: readonly PermisoKey[];
}

export const discordRolesResponseSchema = z.discriminatedUnion('authenticated', [
  z.object({ authenticated: z.literal(true), roles: discordRolesSchema }),
  z.object({ authenticated: z.literal(false) }),
]);

export type DiscordRolesResponse = z.infer<typeof discordRolesResponseSchema>;
