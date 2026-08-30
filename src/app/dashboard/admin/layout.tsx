import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/features/auth/lib/get-server-session';
import { getServerDiscordRoles } from '@/features/roles/api/get-server-discord-roles';
import { hasPermission, resolveNivel } from '@/features/roles';

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>): Promise<React.ReactElement> {
  const [, roles] = await Promise.all([getServerSession(), getServerDiscordRoles()]);

  const nivel = resolveNivel(roles);

  if (!hasPermission(nivel, 'admin')) {
    redirect('/dashboard');
  }

  return <div className="flex h-full flex-col">{children}</div>;
}
