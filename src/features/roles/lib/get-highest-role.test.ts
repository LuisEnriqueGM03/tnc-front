import { describe, expect, it } from 'vitest';
import { getHighestRole, resolveNivel } from './get-highest-role';
import type { DiscordRole } from '../types/role.types';

function makeRole(overrides: Partial<DiscordRole> & { name: string }): DiscordRole {
  return {
    id: `id-${overrides.name}`,
    color: 0,
    position: 0,
    ...overrides,
  };
}

describe('getHighestRole', () => {
  it('devuelve null con lista vacía', () => {
    expect(getHighestRole([])).toBeNull();
  });

  it('devuelve el rol de mayor posición', () => {
    const roles = [
      makeRole({ name: 'miembro', position: 5 }),
      makeRole({ name: 'admin', position: 20 }),
      makeRole({ name: 'mod', position: 12 }),
    ];

    expect(getHighestRole(roles)?.name).toBe('admin');
  });
});

describe('resolveNivel', () => {
  it('resuelve admin por nombre normalizado', () => {
    const roles = [makeRole({ name: '  ADMIN  ', position: 20 })];
    expect(resolveNivel(roles)).toBe('admin');
  });

  it('resuelve moderador por nombre en minúsculas', () => {
    const roles = [makeRole({ name: 'moderador', position: 12 })];
    expect(resolveNivel(roles)).toBe('moderador');
  });

  it('resuelve miembro', () => {
    const roles = [makeRole({ name: 'member', position: 5 })];
    expect(resolveNivel(roles)).toBe('miembro');
  });

  it('devuelve null con roles sin configuración', () => {
    const roles = [makeRole({ name: 'rol-desconocido', position: 3 })];
    expect(resolveNivel(roles)).toBeNull();
  });
});
