'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AlertTriangle, ArrowRight } from 'lucide-react';

import { CyberBadge, DiscordIcon, GlassCard, NeonButton } from '@/shared/components/cyber';
import { env } from '@/shared/config/env';
import { cn } from '@/shared/lib/utils';

export interface LoginCardProps {
  error?: string | undefined;
  className?: string | undefined;
}

interface ErrorDetail {
  title: string;
  desc: string;
}

const errorMessages: Record<string, ErrorDetail> = {
  denied: {
    title: 'AUTORIZACIÓN CANCELADA',
    desc: 'Has cancelado el proceso de acceso en Discord. Puedes reiniciar el protocolo cuando gustes.',
  },
  unauthorized: {
    title: 'ACCESO RESTRINGIDO // SIN MEMBRESÍA',
    desc: 'Debes ser miembro del servidor oficial de Discord TNC Gang para ingresar al panel.',
  },
  state: {
    title: 'SESIÓN DE SEGURIDAD CADUCADA',
    desc: 'El identificador temporal de seguridad OAuth2 expiró. Por favor, reintenta el acceso.',
  },
  invalid_token: {
    title: 'TOKEN DE SESIÓN NO VÁLIDO',
    desc: 'El token de autenticación recibido no es válido o ha expirado.',
  },
  server_error: {
    title: 'FALLO EN ENLACE DE RED',
    desc: 'No se pudo contactar con los servidores de autenticación. Intenta de nuevo en unos momentos.',
  },
  generic: {
    title: 'ERROR DE PROTOCOLO',
    desc: 'Se produjo un error inesperado durante la autenticación. Vuelve a intentarlo.',
  },
};

export function LoginCard({ error, className }: LoginCardProps): React.ReactElement {
  const discordLoginUrl = `${env.NEXT_PUBLIC_API_URL}/auth/discord/login`;
  const defaultError = errorMessages['generic'] as ErrorDetail;
  const errorInfo = error ? (errorMessages[error] ?? defaultError) : undefined;

  return (
    <GlassCard
      withBrackets
      variant="tactical"
      className={cn(
        'relative z-10 w-full max-w-xl overflow-hidden border-2 border-[var(--color-primary)]/40 p-8 shadow-[var(--glow-primary-md)] backdrop-blur-2xl sm:p-12',
        className
      )}
    >
      {/* Rayo láser superior con brillo amarillo predominante */}
      <div className="pointer-events-none absolute -top-px right-0 left-0 h-[2px] overflow-hidden">
        <div className="animate-laser-sweep h-full w-1/2 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />
      </div>

      {/* Cabecera HUD minimalista */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-primary)]/20 pb-4">
        <CyberBadge color="yellow" withLED withPulse>
          SYS // ACCESO RESTRINGIDO
        </CyberBadge>
        <div className="font-mono-data flex items-center gap-1.5 text-xs tracking-widest text-[var(--color-primary)] uppercase">
          <span className="h-2 w-2 rounded-full bg-[var(--color-primary)] shadow-[var(--glow-primary-sm)]" />
          <span>OAUTH2 ACTIVO</span>
        </div>
      </div>

      {/* Identidad visual principal con Logo grande sin borde y aura amarilla */}
      <div className="mt-8 flex flex-col items-center text-center">
        <div className="group relative flex items-center justify-center">
          {/* Aura resplandeciente amarilla multicapa envolvente */}
          <div className="animate-pulse-glow absolute -inset-8 rounded-full bg-[var(--color-primary)]/30 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--color-primary)]/45" />

          {/* Logotipo grande flotante (sin borde) */}
          <div className="relative flex h-64 w-64 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:h-72 sm:w-72">
            <Image
              src="/images/logo_tnc.png"
              alt="Logo TNC DiscordGang"
              width={288}
              height={288}
              priority
              className="h-full w-full object-contain drop-shadow-[0_0_24px_rgba(250,204,21,0.85)] filter"
            />
          </div>
        </div>

        {/* Título de alto impacto en Cyber Yellow */}
        <h1 className="font-display mt-7 text-center text-2xl leading-tight font-extrabold tracking-widest text-[var(--color-primary)] [text-shadow:var(--glow-text-primary)] sm:text-4xl">
          La Crypta
          <br />
          Gang Web
        </h1>
      </div>

      {/* Alerta de error táctico (solo si ocurre) */}
      {errorInfo && (
        <div
          role="alert"
          className="animate-fade-in mt-6 flex items-start gap-3 rounded-md border border-[var(--color-danger)]/60 bg-[var(--color-danger)]/20 p-4 text-left text-sm text-[var(--color-foreground)]"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-danger)]" />
          <div className="flex flex-col gap-0.5">
            <span className="font-mono-data font-bold tracking-wider text-[var(--color-danger)] uppercase">
              {errorInfo.title}
            </span>
            <span className="font-sans-tech text-[var(--color-foreground-muted)]">
              {errorInfo.desc}
            </span>
          </div>
        </div>
      )}

      {/* Botón principal de acceso de gran tamaño con protagonismo amarillo */}
      <div className="mt-10">
        <NeonButton
          asChild
          size="lg"
          variant="primary"
          className="group relative h-14 w-full overflow-hidden text-base font-extrabold tracking-widest shadow-[var(--glow-primary-md)] transition-all duration-300 hover:shadow-[var(--glow-primary-lg)] sm:h-16 sm:text-lg"
        >
          <Link href={discordLoginUrl} className="flex items-center justify-center gap-3">
            <DiscordIcon className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span>ENTRAR CON DISCORD</span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </NeonButton>
      </div>
    </GlassCard>
  );
}
