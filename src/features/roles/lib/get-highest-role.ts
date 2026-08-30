import { ROLES_CONFIG } from '../config/roles.config';
import type { DiscordRole, RolNivel } from '../types/role.types';

export function getHighestRole(roles: readonly DiscordRole[]): DiscordRole | null {
  if (roles.length === 0) {
    return null;
  }

  return [...roles].sort((a, b) => b.position - a.position)[0] ?? null;
}

export function resolveNivel(roles: readonly DiscordRole[]): RolNivel | null {
  for (const config of ROLES_CONFIG) {
    const match = roles.some(
      (role) =>
        config.ids.includes(role.id) || config.nombres.includes(role.name.trim().toLowerCase())
    );
    if (match) {
      return config.nivel;
    }
  }

  return null;
}
