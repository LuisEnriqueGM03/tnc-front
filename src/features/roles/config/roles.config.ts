import type { RolConfig, RolNivel } from '../types/role.types';

export const ROL_NIVEL_ORDER: readonly RolNivel[] = ['admin', 'moderador', 'miembro'];

export const ROLES_CONFIG: readonly RolConfig[] = [
  {
    id: 'nivel-admin',
    nivel: 'admin',
    nombres: ['admin', 'administrador', 'owner', 'staff'],
    ids: [],
    colorToken: '--color-primary',
    permisos: ['admin', 'actividades', 'recordatorios', 'logs', 'miembros'],
  },
  {
    id: 'nivel-moderador',
    nivel: 'moderador',
    nombres: ['moderador', 'mod', 'staff mod'],
    ids: [],
    colorToken: '--color-secondary',
    permisos: ['actividades', 'recordatorios', 'miembros'],
  },
  {
    id: 'nivel-miembro',
    nivel: 'miembro',
    nombres: ['miembro', 'member', 'miembro tnc'],
    ids: [],
    colorToken: '--color-secondary',
    permisos: ['actividades'],
  },
];

export function getRolConfig(nivel: RolNivel): RolConfig | undefined {
  return ROLES_CONFIG.find((c) => c.nivel === nivel);
}
