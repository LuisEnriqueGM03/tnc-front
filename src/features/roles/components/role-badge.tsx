import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { formatDiscordColor } from '../lib/format-role-color';
import type { DiscordRole } from '../types/role.types';

export interface RoleBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'role'> {
  discordRole: Pick<DiscordRole, 'id' | 'name' | 'color'>;
  withLED?: boolean;
  withGlow?: boolean;
}

export function RoleBadge({
  discordRole,
  withLED = true,
  withGlow = true,
  className,
  ...props
}: RoleBadgeProps): React.ReactElement {
  const roleColor = discordRole.color > 0 ? formatDiscordColor(discordRole.color) : undefined;

  return (
    <span
      className={cn(
        'clip-corner-br font-mono-data inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] tracking-widest uppercase',
        roleColor
          ? 'border-[var(--role-color)] text-[var(--role-color)]'
          : 'border-[var(--color-border-default)] text-[var(--color-foreground-muted)]',
        withGlow && roleColor && 'shadow-[0_0_10px_var(--role-color)]',
        className
      )}
      style={roleColor ? ({ '--role-color': roleColor } as React.CSSProperties) : undefined}
      {...props}
    >
      {withLED && (
        <span
          className={cn('led-dot bg-current', withGlow && 'led-dot-pulse')}
          aria-hidden="true"
        />
      )}
      {discordRole.name}
    </span>
  );
}
