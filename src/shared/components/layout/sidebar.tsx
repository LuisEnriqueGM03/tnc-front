'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BellRing,
  CalendarClock,
  LayoutDashboard,
  LogOut,
  ScrollText,
  Settings,
  ShieldCheck,
  Terminal,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { UserAvatar, logout } from '@/features/auth';
import { RoleBadge, hasPermission } from '@/features/roles';
import { cn } from '@/shared/lib/utils';
import type { SessionUser } from '@/features/auth';
import type { DiscordRole, PermisoKey, RolNivel } from '@/features/roles';

interface SidebarNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  permiso: PermisoKey | null;
}

const NAV_ITEMS: readonly SidebarNavItem[] = [
  { href: '/dashboard', label: 'PANEL', icon: LayoutDashboard, permiso: null },
  {
    href: '/dashboard/actividades',
    label: 'ACTIVIDADES',
    icon: CalendarClock,
    permiso: 'actividades',
  },
  {
    href: '/dashboard/recordatorios',
    label: 'RECORDATORIOS',
    icon: BellRing,
    permiso: 'recordatorios',
  },
  { href: '/dashboard/logs', label: 'LOGS', icon: ScrollText, permiso: 'logs' },
  { href: '/dashboard/miembros', label: 'MIEMBROS', icon: Users, permiso: 'miembros' },
  { href: '/dashboard/roles', label: 'ROLES', icon: ShieldCheck, permiso: 'admin' },
  { href: '/dashboard/admin', label: 'ADMIN', icon: Terminal, permiso: 'admin' },
  { href: '/dashboard/settings', label: 'AJUSTES', icon: Settings, permiso: null },
];

export interface SidebarProps {
  user: SessionUser;
  nivel: RolNivel | null;
  highestRole: DiscordRole | null;
}

export function Sidebar({ user, nivel, highestRole }: SidebarProps): React.ReactElement {
  const pathname = usePathname() ?? '/';
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const visibleItems = NAV_ITEMS.filter(
    (item) => item.permiso === null || hasPermission(nivel, item.permiso)
  );

  async function handleLogout(): Promise<void> {
    setIsLoggingOut(true);
    const result = await logout();

    if (result.success) {
      window.location.assign('/login');
    } else {
      setIsLoggingOut(false);
    }
  }

  return (
    <aside className="flex h-dvh w-56 shrink-0 flex-col border-r border-[var(--color-border-subtle)] bg-[var(--glass-bg-dense)] md:w-64">
      {/* Brand */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] px-5 py-5">
        <Zap className="h-5 w-5 text-[var(--color-primary)]" />
        <span
          className="font-display text-sm tracking-widest text-[var(--color-foreground)]"
          style={{ textShadow: 'var(--glow-text-primary)' }}
        >
          LC Gang Web
        </span>
      </div>

      {/* Profile */}
      <div className="border-b border-[var(--color-border-subtle)] px-5 py-4">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} size="sm" />
          <div className="min-w-0">
            <p className="font-sans-tech truncate text-sm font-semibold text-[var(--color-foreground)]">
              {user.globalName ?? user.username}
            </p>
            <p className="font-mono-data truncate text-[10px] text-[var(--color-muted)]">
              @{user.username}
            </p>
          </div>
        </div>
        <div className="mt-3">
          {highestRole ? (
            <RoleBadge discordRole={highestRole} withLED withGlow />
          ) : (
            <span className="font-mono-data text-[10px] tracking-widest text-[var(--color-muted)] uppercase">
              SIN ROL
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group font-sans-tech flex items-center gap-3 border-l-2 px-3 py-2.5 text-sm tracking-wider uppercase transition-all',
                'duration-[var(--duration-snappy)] ease-[var(--ease-cyber-snap)]',
                isActive
                  ? 'border-[var(--color-primary)] bg-[var(--color-surface-hover)] text-[var(--color-primary)] shadow-[var(--glow-primary-sm)]'
                  : 'border-transparent text-[var(--color-foreground-muted)] hover:border-[var(--color-cyan)] hover:bg-[var(--color-surface-abyss)] hover:text-[var(--color-cyan)]'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[var(--color-border-subtle)] p-3">
        <button
          type="button"
          onClick={() => void handleLogout()}
          disabled={isLoggingOut}
          className={cn(
            'flex w-full items-center justify-center gap-2 border border-[var(--color-border-default)]',
            'font-display px-3 py-2.5 text-xs tracking-wider text-[var(--color-danger)] uppercase',
            'transition-all duration-[var(--duration-snappy)]',
            'hover:bg-[var(--color-danger)]/10 hover:shadow-[var(--glow-danger-md)]',
            'disabled:cursor-not-allowed disabled:opacity-40'
          )}
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? 'TERMINANDO...' : 'CERRAR SESIÓN'}
        </button>
      </div>
    </aside>
  );
}
