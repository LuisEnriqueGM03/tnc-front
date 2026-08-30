import { Activity, BellRing, ScrollText, ShieldAlert, Users } from 'lucide-react';
import type { DashboardModule } from '../types/dashboard.types';

export const DASHBOARD_MODULES: readonly DashboardModule[] = [
  {
    id: 'admin',
    title: 'ADMINISTRACIÓN',
    description: 'Control maestro del ecosistema, auditoría de eventos y configuración global.',
    href: '/dashboard/admin',
    permiso: 'admin',
    status: 'available',
    icon: ShieldAlert,
  },
  {
    id: 'actividades',
    title: 'ACTIVIDADES',
    description: 'Historial de eventos, alertas de moderación y recordatorios de la comunidad.',
    href: '/dashboard/actividades',
    permiso: 'actividades',
    status: 'available',
    icon: Activity,
  },
  {
    id: 'recordatorios',
    title: 'RECORDATORIOS',
    description: 'Agenda táctica y avisos programados para los miembros.',
    href: '/dashboard/recordatorios',
    permiso: 'recordatorios',
    status: 'available',
    icon: BellRing,
  },
  {
    id: 'logs',
    title: 'LOGS',
    description: 'Telemetría de auditoría y trazabilidad de eventos del sistema.',
    href: '/dashboard/logs',
    permiso: 'logs',
    status: 'available',
    icon: ScrollText,
  },
  {
    id: 'miembros',
    title: 'MIEMBROS',
    description: 'Directorio y estado de los miembros de la comunidad.',
    href: '/dashboard/miembros',
    permiso: 'miembros',
    status: 'available',
    icon: Users,
  },
];
