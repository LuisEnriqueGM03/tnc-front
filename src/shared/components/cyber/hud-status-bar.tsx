'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Activity, Clock, Radio } from 'lucide-react';
import { useMounted } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';

export type HudConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

export interface HudStatusBarProps extends React.HTMLAttributes<HTMLElement> {
  breadcrumbs?: string[];
  connectionStatus?: HudConnectionStatus;
  latencyMs?: number;
}

function formatUtcTime(date: Date): string {
  return date.toISOString().slice(11, 19);
}

const connectionLabel: Record<HudConnectionStatus, string> = {
  connected: 'CONECTADO',
  disconnected: 'SIN SEÑAL',
  reconnecting: 'RECONECTANDO',
};

export function HudStatusBar({
  className,
  breadcrumbs,
  connectionStatus = 'connected',
  latencyMs,
  ...props
}: HudStatusBarProps): React.ReactElement {
  const mounted = useMounted();
  const [now, setNow] = React.useState<Date | null>(null);
  const pathname = usePathname() ?? '/';

  React.useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((s) => s.toUpperCase());

  const effectiveBreadcrumbs = breadcrumbs ?? ['SYS', ...segments];

  return (
    <footer
      className={cn(
        'flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-[var(--color-border-subtle)]',
        'font-mono-data bg-[var(--glass-bg-dense)] px-4 py-2 text-[11px] tracking-widest uppercase',
        'text-[var(--color-muted)]',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Clock className="h-3.5 w-3.5 text-[var(--color-cyan)]" />
        <span>SYS TIME</span>
        <span className="text-[var(--color-foreground)]">
          {mounted && now ? `${formatUtcTime(now)} UTC` : '--:--:-- UTC'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Radio className="h-3.5 w-3.5 text-[var(--color-cyan)]" />
        <span>WS</span>
        <span
          className={cn(
            'flex items-center gap-1.5',
            connectionStatus === 'connected' && 'text-[var(--color-success)]',
            connectionStatus === 'disconnected' && 'text-[var(--color-danger)]',
            connectionStatus === 'reconnecting' && 'text-[var(--color-warning)]'
          )}
        >
          <span
            className={cn(
              'led-dot bg-current',
              connectionStatus === 'connected' && 'led-dot-pulse'
            )}
            aria-hidden="true"
          />
          {connectionLabel[connectionStatus]}
          {latencyMs !== undefined && connectionStatus === 'connected' && (
            <span> [{latencyMs}ms]</span>
          )}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
        <Activity className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" />
        {effectiveBreadcrumbs.map((crumb, index) => {
          const isLast = index === effectiveBreadcrumbs.length - 1;
          return (
            <span key={`${crumb}-${index}`} className="flex items-center gap-1">
              <span className={cn(isLast && 'text-[var(--color-foreground)]')}>{crumb}</span>
              {!isLast && <span className="text-[var(--color-disabled)]">{'//'}</span>}
            </span>
          );
        })}
      </div>
    </footer>
  );
}
