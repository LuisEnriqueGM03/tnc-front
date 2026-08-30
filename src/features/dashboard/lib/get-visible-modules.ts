import { hasPermission } from '@/features/roles';
import type { RolNivel } from '@/features/roles';
import { DASHBOARD_MODULES } from '../config/modules.config';
import type { DashboardModule } from '../types/dashboard.types';

export function getVisibleModules(nivel: RolNivel | null): DashboardModule[] {
  return DASHBOARD_MODULES.filter(
    (module) => module.permiso === null || hasPermission(nivel, module.permiso)
  );
}
