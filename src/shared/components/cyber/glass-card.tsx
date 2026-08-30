import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glowing' | 'tactical';
  withBrackets?: boolean;
  withScanlines?: boolean;
  glowColor?: 'yellow' | 'cyan' | 'magenta' | 'danger';
}

export function GlassCard({
  className,
  variant = 'default',
  withBrackets = false,
  withScanlines = false,
  glowColor,
  children,
  ...props
}: GlassCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        'glass-panel clip-corner-tl-br relative',
        variant === 'elevated' && 'bg-[var(--glass-bg-dense)]',
        variant === 'glowing' && 'glow-primary',
        variant === 'tactical' && 'border-[var(--color-border-cyan)]',
        withBrackets && 'hud-brackets',
        withScanlines && 'scanlines-overlay',
        glowColor === 'cyan' && 'glow-cyan',
        glowColor === 'magenta' && 'glow-magenta',
        glowColor === 'danger' && 'glow-danger',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
