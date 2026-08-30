import type { LucideIcon } from 'lucide-react';
import type { PermisoKey } from '@/features/roles';

export type DashboardModuleStatus = 'available' | 'coming-soon';

export interface DashboardModule {
  id: string;
  title: string;
  description: string;
  href: string;
  permiso: PermisoKey | null;
  status: DashboardModuleStatus;
  icon: LucideIcon;
}
