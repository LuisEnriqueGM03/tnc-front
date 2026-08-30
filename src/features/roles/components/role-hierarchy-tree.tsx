import * as React from 'react';
import { Crown, Minus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { formatDiscordColor } from '../lib/format-role-color';
import type { DiscordRole } from '../types/role.types';

export interface RoleHierarchyTreeProps {
  roles: readonly DiscordRole[];
  highlightRoleId?: string;
  className?: string;
}

export function RoleHierarchyTree({
  roles,
  highlightRoleId,
  className,
}: RoleHierarchyTreeProps): React.ReactElement {
  const sorted = [...roles].sort((a, b) => b.position - a.position);

  if (sorted.length === 0) {
    return (
      <p className="font-mono-data text-xs text-[var(--color-muted)]">SIN ROLES DISPONIBLES</p>
    );
  }

  return (
    <ol className={cn('flex flex-col gap-0.5', className)}>
      {sorted.map((role, index) => {
        const color = role.color > 0 ? formatDiscordColor(role.color) : undefined;
        const isHighest = index === 0;
        const isHighlighted = role.id === highlightRoleId;

        return (
          <li
            key={role.id}
            className={cn(
              'font-mono-data flex items-center gap-3 border-l-2 py-2 pr-2 pl-4 text-xs transition-all duration-[var(--duration-snappy)]',
              isHighlighted
                ? 'border-[var(--role-color)] bg-[var(--color-surface-hover)]'
                : 'border-[var(--color-border-subtle)] bg-transparent hover:bg-[var(--color-surface-abyss)]'
            )}
            style={color ? ({ '--role-color': color } as React.CSSProperties) : undefined}
          >
            <span
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center',
                isHighest ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'
              )}
            >
              {isHighest ? <Crown className="h-4 w-4" /> : <Minus className="h-3 w-3" />}
            </span>

            <span
              className={cn(
                'flex-1 truncate',
                color ? 'text-[var(--role-color)]' : 'text-[var(--color-foreground-muted)]',
                isHighest && 'font-bold',
                isHighlighted && 'text-[var(--role-color)]'
              )}
            >
              {role.name}
            </span>

            <span className="shrink-0 text-[10px] text-[var(--color-disabled)]">
              POS {role.position}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
