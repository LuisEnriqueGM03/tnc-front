import type { ReactElement } from 'react';

import { LoginCard } from '@/features/auth';
import { CyberGrid } from '@/shared/components/cyber';

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps): Promise<ReactElement> {
  const { error } = await searchParams;

  return (
    <main className="bg-glow-primary relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      <CyberGrid withScanlines />

      {/* HUD Telemetría Ambiental Superior */}
      <div className="font-mono-data pointer-events-none absolute top-6 left-6 hidden flex-col gap-1 text-[10px] text-[var(--color-muted)] lg:flex">
        <span className="flex items-center gap-1.5 text-[var(--color-primary)]">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary)] shadow-[var(--glow-primary-sm)]" />
          SYS // SECURE GATEWAY
        </span>
        <span>NODE: TNC-PROD-01 // LATAM</span>
        <span>PROTO: OAUTH2.0 / DISCORD</span>
      </div>

      <div className="font-mono-data pointer-events-none absolute top-6 right-6 hidden flex-col items-end gap-1 text-[10px] text-[var(--color-muted)] lg:flex">
        <span className="flex items-center gap-1.5 text-[var(--color-primary)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shadow-[var(--glow-primary-sm)]" />
          ESTADO: OPERATIVO
        </span>
        <span>API: v10.0 // TLS 1.3</span>
        <span>LATENCY: 12ms</span>
      </div>

      {/* HUD Telemetría Ambiental Inferior */}
      <div className="font-mono-data pointer-events-none absolute bottom-6 left-6 hidden items-center gap-2 text-[10px] text-[var(--color-disabled)] lg:flex">
        <span>[ + ] 00:24:88:12</span>
        <span>{'//'}</span>
        <span>TNC-DISCORDGANG-HUD</span>
      </div>

      <div className="font-mono-data pointer-events-none absolute right-6 bottom-6 hidden items-center gap-2 text-[10px] text-[var(--color-disabled)] lg:flex">
        <span>ENCRYPTION: AES-256-GCM</span>
        <span>[ + ]</span>
      </div>

      {/* Tarjeta Central de Autenticación */}
      <LoginCard error={error} />
    </main>
  );
}
