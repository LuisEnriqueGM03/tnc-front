import type { ReactNode } from 'react';
import { getServerSession } from '@/features/auth/lib/get-server-session';
import { getServerDiscordRoles } from '@/features/roles/api/get-server-discord-roles';
import { getHighestRole, resolveNivel } from '@/features/roles';
import { Sidebar } from '@/shared/components/layout';
import { HudStatusBar } from '@/shared/components/cyber';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>): Promise<React.ReactElement> {
  const [user, roles] = await Promise.all([getServerSession(), getServerDiscordRoles()]);

  const nivel = resolveNivel(roles);
  const highestRole = getHighestRole(roles);

  return (
    <div className="flex min-h-dvh">
      <Sidebar user={user} nivel={nivel} highestRole={highestRole} />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <main className="flex-1 px-6 py-6">{children}</main>
        <HudStatusBar />
      </div>
    </div>
  );
}
