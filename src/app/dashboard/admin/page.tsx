import { Lock, Terminal } from 'lucide-react';
import { CyberBadge, CyberGrid, GlassCard } from '@/shared/components/cyber';

export default function AdminPage(): React.ReactElement {
  return (
    <div className="relative flex min-h-[60dvh] items-center justify-center overflow-hidden">
      <CyberGrid />

      <GlassCard withBrackets className="relative z-10 w-full max-w-lg p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center border border-[var(--color-danger)] text-[var(--color-danger)] shadow-[var(--glow-danger-md)]">
          <Lock className="h-6 w-6" />
        </span>

        <h1 className="font-display mt-6 text-xl tracking-widest text-[var(--color-foreground)]">
          TERMINAL LOCKED {'//'} LEVEL 3 ADMIN REQUIRED
        </h1>

        <p className="font-sans-tech mt-3 text-sm text-[var(--color-foreground-muted)]">
          La interfaz de comando maestro se encuentra en desarrollo. La auditoría de acceso está
          activa.
        </p>

        <div className="font-mono-data mt-6 flex items-center justify-center gap-2 text-xs tracking-widest text-[var(--color-cyan)] uppercase">
          <Terminal className="h-4 w-4" />
          <span>SECTOR BLOQUEADO // AUDITORÍA PENDIENTE</span>
        </div>

        <CyberBadge color="danger" withLED className="mt-6">
          NIVEL 3 REQUERIDO
        </CyberBadge>
      </GlassCard>
    </div>
  );
}
