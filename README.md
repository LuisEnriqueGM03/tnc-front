# TNC DiscordGang — Frontend Web

Frontend web profesional del ecosistema **TNC DiscordGang** (bot de Discord + backend NestJS). Panel de control con autenticación mediante Discord OAuth y dashboard con roles y permisos derivados de los roles de Discord del servidor.

---

## Stack Tecnológico

| Capa        | Tecnología                           |
| ----------- | ------------------------------------ |
| Framework   | Next.js 15 (App Router)              |
| Lenguaje    | TypeScript estricto                  |
| Estilos     | Tailwind CSS v4 + shadcn/ui (Radix)  |
| Tipografías | Orbitron (display) + Rajdhani (sans) |
| Tema        | Cyberpunk oscuro (CSS variables)     |
| Puerto      | 5173                                 |

## Requisitos

- Node.js >= 20
- Backend NestJS corriendo en `http://localhost:3000` (o la URL configurada)

## Variables de Entorno

Copiar `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

| Variable              | Descripción                 | Default                        |
| --------------------- | --------------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | URL base del backend NestJS | `http://localhost:3000/api/v1` |

## Scripts

```bash
npm run dev          # Inicia dev server en puerto 5173
npm run build        # Build de producción
npm run start        # Inicia servidor de producción
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # tsc --noEmit
```

## Estructura del Proyecto

```
src/
├── app/                     # App Router (rutas y layouts)
│   ├── layout.tsx           # Root layout (fuentes + tema oscuro)
│   ├── globals.css          # Tema CSS variables (cyberpunk)
│   ├── login/               # Página de login Discord
│   ├── dashboard/           # Área protegida (sidebar + home)
│   └── api/auth/            # Route handlers (callback, me, logout)
├── features/                # Módulos por funcionalidad (Feature-First)
│   ├── auth/                # Autenticación OAuth Discord
│   ├── roles/               # Roles y permisos
│   ├── dashboard/           # Home del panel
│   ├── admin/               # Panel de administración
│   └── actividades/         # Placeholders futuros
├── shared/                  # Código transversal compartido
│   ├── components/ui/       # shadcn/ui (átomos base)
│   ├── components/ui/cyber/ # Componentes cyberpunk (NeonButton, GlassCard, ...)
│   ├── lib/                 # api.ts (fetch client), utils.ts (cn)
│   └── types/               # Tipos globales
└── middleware.ts            # Protección de rutas
```

## Estándares de Desarrollo

Ver [`docs/guidelines/`](docs/guidelines/) para las directrices completas de arquitectura, estilo, git, calidad y diseño.

- [`AGENTS.md`](AGENTS.md) — Pautas para agentes de IA que operen en el proyecto.

## Licencia

Uso interno del ecosistema TNC DiscordGang.
