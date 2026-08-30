import * as React from 'react';
import type { RolNivel } from '@/features/roles';
import { getVisibleModules } from '../lib/get-visible-modules';
import { ModuleCard } from './module-card';

export interface ModuleGridProps {
  nivel: RolNivel | null;
}

export function ModuleGrid({ nivel }: ModuleGridProps): React.ReactElement {
  const modules = getVisibleModules(nivel);

  if (modules.length === 0) {
    return (
      <p className="font-mono-data text-xs tracking-widest text-[var(--color-muted)] uppercase">
        SIN MÓDULOS AUTORIZADOS PARA ESTE NIVEL
      </p>
    );
  }

  return (
    <div className="grid content-start gap-4 sm:grid-cols-2">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
}
