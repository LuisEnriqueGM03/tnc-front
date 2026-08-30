import type { ActionResult } from '@/shared/types/api.types';

export async function logout(): Promise<ActionResult<{ loggedOut: true }>> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return { success: false, error: 'No se pudo cerrar la sesión' };
    }

    return { success: true, data: { loggedOut: true } };
  } catch {
    return { success: false, error: 'Error de red al cerrar la sesión' };
  }
}
