import { ROLES_CONFIG } from '../config/roles.config';
import type { PermisoKey, RolNivel } from '../types/role.types';

export function getPermisosForNivel(nivel: RolNivel | null | undefined): readonly PermisoKey[] {
  if (!nivel) {
    return [];
  }

  const config = ROLES_CONFIG.find((c) => c.nivel === nivel);
  return config ? config.permisos : [];
}

export function hasPermission(nivel: RolNivel | null | undefined, permiso: PermisoKey): boolean {
  return getPermisosForNivel(nivel).includes(permiso);
}
