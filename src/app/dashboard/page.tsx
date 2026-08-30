import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { getServerSession } from '@/features/auth/lib/get-server-session';
import { getServerDiscordRoles } from '@/features/roles/api/get-server-discord-roles';
import { getHighestRole, resolveNivel } from '@/features/roles';
import { RoleBadge } from '@/features/roles';
import { GlassCard, NeonButton } from '@/shared/components/cyber';

interface NivelAction {
  label: string;
  href: string;
}

const NIVEL_ACTIONS: Record<'admin' | 'moderador' | 'miembro', NivelAction> = {
  admin: { label: 'ADMIN', href: '/dashboard/admin' },
  moderador: { label: 'MODERADOR', href: '/dashboard/actividades' },
  miembro: { label: 'MIEMBRO', href: '/dashboard/actividades' },
};

export default async function DashboardHomePage(): Promise<React.ReactElement> {
  const [user, roles] = await Promise.all([getServerSession(), getServerDiscordRoles()]);

  const nivel = resolveNivel(roles) ?? 'miembro';
  const highestRole = getHighestRole(roles);
  const displayName = user.globalName ?? user.username;
  const action = NIVEL_ACTIONS[nivel];
  const avatarUrl = user.avatarUrl ? `${user.avatarUrl}?size=256` : null;

  return (
    <div className="flex min-h-[75dvh] items-center justify-center">
      <GlassCard
        withBrackets
        variant="tactical"
        className="flex w-full max-w-xl flex-col items-center gap-8 p-10 sm:flex-row sm:justify-between sm:gap-10"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`Avatar de ${displayName}`}
              width={176}
              height={176}
              priority
              className="h-44 w-44 rounded-full border-2 border-[var(--color-primary)] object-cover shadow-[var(--glow-primary-md)]"
            />
          ) : (
            <span className="font-display flex h-44 w-44 items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-surface-elevated)] text-4xl text-[var(--color-primary)]">
              {displayName.slice(0, 2).toUpperCase()}
            </span>
          )}

          <h1 className="font-display text-2xl tracking-widest text-[var(--color-foreground)]">
            {displayName}
          </h1>

          {highestRole ? (
            <RoleBadge discordRole={highestRole} withLED withGlow />
          ) : (
            <span className="font-mono-data text-xs tracking-widest text-[var(--color-muted)] uppercase">
              SIN ROL
            </span>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          <NeonButton asChild size="lg" variant="primary">
            <Link href={action.href}>
              <ShieldCheck className="h-5 w-5" />
              {action.label}
            </Link>
          </NeonButton>
          <p className="font-mono-data text-[10px] tracking-widest text-[var(--color-muted)] uppercase">
            Acceso por rol
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
