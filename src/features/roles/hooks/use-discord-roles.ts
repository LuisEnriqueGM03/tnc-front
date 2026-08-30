'use client';

import * as React from 'react';
import { discordRolesResponseSchema } from '../types/role.types';
import type { DiscordRole } from '../types/role.types';

export interface UseDiscordRolesResult {
  roles: DiscordRole[];
  isLoading: boolean;
  error: string | null;
}

export function useDiscordRoles(): UseDiscordRolesResult {
  const [roles, setRoles] = React.useState<DiscordRole[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    async function load(): Promise<void> {
      try {
        const res = await fetch('/api/auth/roles', {
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error('No se pudieron obtener los roles');
        }

        const parsed = discordRolesResponseSchema.safeParse((await res.json()) as unknown);

        if (!parsed.success) {
          throw new Error('Respuesta de roles inválida');
        }

        if (!isCancelled) {
          setRoles(parsed.data.authenticated ? parsed.data.roles : []);
        }
      } catch {
        if (!isCancelled) {
          setError('No se pudieron cargar los roles del servidor');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { roles, isLoading, error };
}
