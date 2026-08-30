import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import type { SessionUser } from '../types/auth.types';

export interface UserAvatarProps {
  user: Pick<SessionUser, 'avatarUrl' | 'globalName' | 'username'>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

const imageSizeMap: Record<'sm' | 'md' | 'lg', number> = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function UserAvatar({ user, size = 'md', className }: UserAvatarProps): React.ReactElement {
  const displayName = user.globalName ?? user.username;
  const initials = displayName.slice(0, 2).toUpperCase();

  if (user.avatarUrl) {
    return (
      <Image
        src={user.avatarUrl}
        alt={`Avatar de ${displayName}`}
        width={imageSizeMap[size]}
        height={imageSizeMap[size]}
        className={cn(
          'rounded-[var(--radius-tactical-sm)] border border-[var(--color-border-default)]',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-[var(--radius-tactical-sm)] border border-[var(--color-border-default)]',
        'font-display bg-[var(--color-surface-elevated)] text-xs text-[var(--color-primary)]',
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
