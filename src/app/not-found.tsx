import { Crosshair, Terminal } from 'lucide-react';
import Link from 'next/link';
import { NeonButton } from '@/shared/components/cyber';

export default function NotFoundPage(): React.ReactElement {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6">
      <Terminal className="h-10 w-10 text-[var(--color-cyan)]" />
      <p className="font-mono-data text-xs tracking-widest text-[var(--color-cyan)] uppercase">
        ERROR 404 // COORDENADAS PERDIDAS
      </p>
      <h1 className="font-display text-5xl text-[var(--color-foreground)]">
        SEÑAL <span className="glitch-text text-[var(--color-danger)]">PERDIDA</span>
      </h1>
      <p className="font-sans-tech max-w-md text-center text-sm text-[var(--color-foreground-muted)]">
        El sector solicitado no existe o fue reasignado por el protocolo de seguridad.
      </p>
      <NeonButton asChild>
        <Link href="/">
          <Crosshair className="h-4 w-4" />
          VOLVER AL SECTOR PRINCIPAL
        </Link>
      </NeonButton>
    </main>
  );
}
