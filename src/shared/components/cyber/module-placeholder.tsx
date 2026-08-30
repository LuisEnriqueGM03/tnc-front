import * as React from 'react';
import { Hammer, Lock } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { CyberBadge } from './cyber-badge';
import { GlassCard } from './glass-card';

export interface ModulePlaceholderProps {
  title: string;
  description: string;
  locked?: boolean;
  requiredLevel?: string;
  className?: string;
}

export function ModulePlaceholder({
  title,
  description,
  locked = false,
  requiredLevel,
  className,
}: ModulePlaceholderProps): React.ReactElement {
  const Icon = locked ? Lock : Hammer;

  return (
    <GlassCard
      withBrackets
      className={cn(
        'flex min-h-[50dvh] flex-col items-center justify-center gap-5 p-10 text-center',
        className
      )}
    >
      <span
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-[var(--radius-tactical-sm)] border',
          locked
            ? 'border-[var(--color-danger)] text-[var(--color-danger)] shadow-[var(--glow-danger-md)]'
            : 'border-[var(--color-cyan)] text-[var(--color-cyan)] shadow-[var(--glow-cyan-sm)]'
        )}
      >
        <Icon className="h-6 w-6" />
      </span>

      <h1 className="font-display text-xl tracking-widest text-[var(--color-foreground)]">
        {title}
      </h1>

      <p className="font-sans-tech max-w-md text-sm text-[var(--color-foreground-muted)]">
        {description}
      </p>

      <CyberBadge color={locked ? 'danger' : 'cyan'} withLED withPulse={locked}>
        {locked
          ? requiredLevel
            ? `ACCESO RESTRINGIDO // ${requiredLevel}`
            : 'ACCESO RESTRINGIDO'
          : 'PRÓXIMAMENTE'}
      </CyberBadge>
    </GlassCard>
  );
}
