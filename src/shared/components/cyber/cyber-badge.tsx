import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type CyberBadgeColor =
  'yellow' | 'cyan' | 'magenta' | 'purple' | 'success' | 'warning' | 'danger' | 'neutral';

export interface CyberBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: CyberBadgeColor;
  withLED?: boolean;
  withPulse?: boolean;
}

const colorClasses: Record<CyberBadgeColor, string> = {
  yellow:
    'border-[var(--color-primary)] text-[var(--color-primary)] shadow-[var(--glow-primary-sm)]',
  cyan: 'border-[var(--color-cyan)] text-[var(--color-cyan)] shadow-[var(--glow-cyan-sm)]',
  magenta:
    'border-[var(--color-magenta)] text-[var(--color-magenta)] shadow-[var(--glow-magenta-md)]',
  purple: 'border-[var(--color-purple)] text-[var(--color-purple)]',
  success:
    'border-[var(--color-success)] text-[var(--color-success)] shadow-[var(--glow-success-md)]',
  warning: 'border-[var(--color-warning)] text-[var(--color-warning)]',
  danger: 'border-[var(--color-danger)] text-[var(--color-danger)] shadow-[var(--glow-danger-md)]',
  neutral: 'border-[var(--color-border-default)] text-[var(--color-foreground-muted)]',
};

export function CyberBadge({
  className,
  color = 'neutral',
  withLED = false,
  withPulse = false,
  children,
  ...props
}: CyberBadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        'clip-corner-br inline-flex items-center gap-1.5 border px-2 py-0.5',
        'font-mono-data text-[10px] tracking-widest uppercase',
        colorClasses[color],
        className
      )}
      {...props}
    >
      {withLED && (
        <span
          className={cn('led-dot bg-current', withPulse && 'led-dot-pulse')}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
