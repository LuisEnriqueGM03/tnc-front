export { getDiscordRoles } from './api/get-discord-roles';
export { RoleBadge, type RoleBadgeProps } from './components/role-badge';
export { RoleHierarchyTree, type RoleHierarchyTreeProps } from './components/role-hierarchy-tree';
export { getRolConfig, ROL_NIVEL_ORDER, ROLES_CONFIG } from './config/roles.config';
export { useDiscordRoles, type UseDiscordRolesResult } from './hooks/use-discord-roles';
export { useHasPermission } from './hooks/use-has-permission';
export { formatDiscordColor } from './lib/format-role-color';
export { getHighestRole, resolveNivel } from './lib/get-highest-role';
export { getPermisosForNivel, hasPermission } from './lib/permission-calculator';

export type {
  DiscordRole,
  DiscordRolesResponse,
  PermisoKey,
  RolConfig,
  RolNivel,
} from './types/role.types';
export { discordRolesResponseSchema, discordRolesSchema } from './types/role.types';
