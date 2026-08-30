'use client';

import * as React from 'react';
import { hasPermission } from '../lib/permission-calculator';
import { resolveNivel } from '../lib/get-highest-role';
import type { DiscordRole, PermisoKey } from '../types/role.types';

export function useHasPermission(roles: readonly DiscordRole[], permiso: PermisoKey): boolean {
  return React.useMemo(() => {
    const nivel = resolveNivel(roles);
    return hasPermission(nivel, permiso);
  }, [roles, permiso]);
}
