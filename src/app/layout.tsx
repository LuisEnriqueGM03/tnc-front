import type { Metadata } from 'next';
import { JetBrains_Mono, Orbitron, Rajdhani } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TNC DiscordGang',
    template: '%s // TNC DiscordGang',
  },
  description:
    'Panel de control Cyberpunk del ecosistema TNC DiscordGang: roles, permisos y telemetría de la comunidad.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html
      lang="es"
      className={`${orbitron.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-[var(--color-background)] text-[var(--color-foreground-muted)] antialiased">
        {children}
      </body>
    </html>
  );
}
