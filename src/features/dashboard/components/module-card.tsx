import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CyberBadge, GlassCard } from '@/shared/components/cyber';
import type { DashboardModule } from '../types/dashboard.types';

export interface ModuleCardProps {
  module: DashboardModule;
}

export function ModuleCard({ module }: ModuleCardProps): React.ReactElement {
  const Icon = module.icon;
  const isAvailable = module.status === 'available';

  const cardContent = (
    <GlassCard
      withBrackets
      className="flex h-full flex-col p-6 transition-all duration-[var(--duration-snappy)] ease-[var(--ease-cyber-snap)] group-hover:border-[var(--color-border-glow)] group-hover:bg-[var(--color-surface-hover)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--color-border-cyan)] text-[var(--color-cyan)] shadow-[var(--glow-cyan-sm)]">
          <Icon className="h-5 w-5" />
        </span>
        {!isAvailable && (
          <CyberBadge color="cyan" withLED>
            PRÓXIMAMENTE
          </CyberBadge>
        )}
      </div>

      <h2 className="font-display mt-5 text-base tracking-wider text-[var(--color-foreground)]">
        {module.title}
      </h2>
      <p className="font-sans-tech mt-2 flex-1 text-sm text-[var(--color-foreground-muted)]">
        {module.description}
      </p>

      {isAvailable ? (
        <span className="font-mono-data mt-5 inline-flex items-center gap-1.5 text-[11px] tracking-widest text-[var(--color-primary)] uppercase">
          ACCEDER
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-[var(--duration-snappy)] group-hover:translate-x-0.5" />
        </span>
      ) : (
        <span className="font-mono-data mt-5 text-[11px] tracking-widest text-[var(--color-muted)] uppercase">
          MÓDULO EN DESARROLLO
        </span>
      )}
    </GlassCard>
  );

  if (isAvailable) {
    return (
      <Link href={module.href} className="group block h-full">
        {cardContent}
      </Link>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}
