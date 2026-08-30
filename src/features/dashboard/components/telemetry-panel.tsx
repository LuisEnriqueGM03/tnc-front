'use client';

import * as React from 'react';
import { Activity, Clock, Cpu, ShieldCheck, Users } from 'lucide-react';
import { useMounted } from '@/shared/hooks';
import { CyberBadge, GlassCard } from '@/shared/components/cyber';
import { RoleBadge } from '@/features/roles';
import { getHighestRole } from '@/features/roles';
import type { SessionUser } from '@/features/auth';
import type { DiscordRole, RolNivel } from '@/features/roles';

export interface TelemetryPanelProps {
  user: SessionUser;
  roles: readonly DiscordRole[];
  nivel: RolNivel | null;
  moduleCount: number;
}

function formatUtcTime(date: Date): string {
  return date.toISOString().slice(11, 19);
}

const nivelLabel: Record<RolNivel, string> = {
  admin: 'NIVEL 3 // ADMIN',
  moderador: 'NIVEL 2 // MODERADOR',
  miembro: 'NIVEL 1 // MIEMBRO',
};

export function TelemetryPanel({
  user,
  roles,
  nivel,
  moduleCount,
}: TelemetryPanelProps): React.ReactElement {
  const mounted = useMounted();
  const [now, setNow] = React.useState<Date | null>(null);
  const highestRole = getHighestRole(roles);

  React.useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <GlassCard withBrackets variant="tactical" className="flex h-fit flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm tracking-widest text-[var(--color-foreground)]">
          TELEMETRÍA // SERVIDOR
        </h2>
        <span
          className="led-dot led-dot-pulse bg-current text-[var(--color-success)]"
          aria-hidden="true"
        />
      </div>

      <div className="font-mono-data flex items-center gap-3 text-sm">
        <Clock className="h-4 w-4 text-[var(--color-cyan)]" />
        <span className="text-[var(--color-muted)]">SYS TIME</span>
        <span className="text-[var(--color-foreground)]">
          {mounted && now ? `${formatUtcTime(now)} UTC` : '--:--:-- UTC'}
        </span>
      </div>

      <div className="font-mono-data flex items-center gap-3 text-sm">
        <Activity className="h-4 w-4 text-[var(--color-success)]" />
        <span className="text-[var(--color-muted)]">BACKEND</span>
        <span className="text-[var(--color-success)]">ONLINE</span>
      </div>

      <div className="font-mono-data flex items-center gap-3 text-sm">
        <Cpu className="h-4 w-4 text-[var(--color-cyan)]" />
        <span className="text-[var(--color-muted)]">OPERADOR</span>
        <span className="truncate text-[var(--color-foreground)]">
          {(user.globalName ?? user.username).toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
        <CyberBadge
          color={nivel === 'admin' ? 'yellow' : nivel === 'moderador' ? 'cyan' : 'magenta'}
          withLED
          withPulse={nivel === 'admin'}
        >
          {nivel ? nivelLabel[nivel] : 'NIVEL 0 // VISITANTE'}
        </CyberBadge>
      </div>

      <div className="flex items-center gap-3">
        <Users className="h-4 w-4 shrink-0 text-[var(--color-cyan)]" />
        {highestRole ? (
          <RoleBadge discordRole={highestRole} withLED withGlow />
        ) : (
          <span className="font-mono-data text-xs text-[var(--color-muted)]">
            SIN ROL PRINCIPAL
          </span>
        )}
      </div>

      <div className="my-1 border-t border-[var(--color-border-subtle)]" />

      <dl className="font-mono-data grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-[10px] tracking-widest text-[var(--color-muted)] uppercase">ROLES</dt>
          <dd className="mt-1 text-lg text-[var(--color-foreground)]">{roles.length}</dd>
        </div>
        <div>
          <dt className="text-[10px] tracking-widest text-[var(--color-muted)] uppercase">
            MÓDULOS
          </dt>
          <dd className="mt-1 text-lg text-[var(--color-foreground)]">{moduleCount}</dd>
        </div>
      </dl>
    </GlassCard>
  );
}
