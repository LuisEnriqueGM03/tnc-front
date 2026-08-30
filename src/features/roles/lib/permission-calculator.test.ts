import { describe, expect, it } from 'vitest';
import { getPermisosForNivel, hasPermission } from './permission-calculator';

describe('getPermisosForNivel', () => {
  it('devuelve permisos vacíos para nivel inexistente', () => {
    expect(getPermisosForNivel(null)).toEqual([]);
    expect(getPermisosForNivel(undefined)).toEqual([]);
  });

  it('otorga acceso total al nivel admin', () => {
    const permisos = getPermisosForNivel('admin');
    expect(permisos).toContain('admin');
    expect(permisos).toContain('logs');
    expect(permisos).toContain('miembros');
  });

  it('otorga acceso de moderación al nivel moderador', () => {
    const permisos = getPermisosForNivel('moderador');
    expect(permisos).toContain('actividades');
    expect(permisos).toContain('recordatorios');
    expect(permisos).toContain('miembros');
    expect(permisos).not.toContain('admin');
  });

  it('otorga solo actividades al nivel miembro', () => {
    const permisos = getPermisosForNivel('miembro');
    expect(permisos).toEqual(['actividades']);
  });
});

describe('hasPermission', () => {
  it('niega permisos sin nivel', () => {
    expect(hasPermission(null, 'actividades')).toBe(false);
  });

  it('admin tiene permiso admin', () => {
    expect(hasPermission('admin', 'admin')).toBe(true);
  });

  it('moderador no tiene permiso admin', () => {
    expect(hasPermission('moderador', 'admin')).toBe(false);
  });

  it('miembro no tiene permiso de miembros', () => {
    expect(hasPermission('miembro', 'miembros')).toBe(false);
  });
});
