'use client';

import { RotateCcw } from 'lucide-react';
import { NeonButton } from '@/shared/components/cyber';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps): React.ReactElement {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6">
      <p className="font-display text-2xl text-[var(--color-danger)]">ERROR CRÍTICO DEL SISTEMA</p>
      <p className="font-sans-tech max-w-md text-center text-sm text-[var(--color-foreground-muted)]">
        {error.message || 'Se produjo un fallo inesperado del sistema.'}
      </p>
      <NeonButton variant="cyan" onClick={() => reset()}>
        <RotateCcw className="h-4 w-4" />
        REINICIAR SISTEMA
      </NeonButton>
    </main>
  );
}
