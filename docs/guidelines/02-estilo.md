# Directriz 02 — TypeScript Ultra-Estricto, ESLint y Estándares de Código

Guía oficial, exhaustiva y obligatoria de tipado, arquitectura de código, calidad y formato para el Frontend **TNC DiscordGang**.

---

## 1. Configuración y Filosofía de TypeScript (Modo Ultra-Estricto)

El proyecto opera bajo **TypeScript 5+** en modo de máxima rigurosidad. El objetivo es eliminar cualquier comportamiento indefinido en tiempo de compilación antes de llegar a ejecución.

### 1.1. Configuración Maestra `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "verbatimModuleSyntax": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 1.2. Principios de Tipado Innegociables

1. **Tolerancia Cero con `any`:**
   - El uso de `any` está prohibido por el compilador y linter (`severity: error`).
   - Para datos de tipo incierto (respuestas externas, eventos desconocidos, cookies parseadas), se utiliza `unknown` combinado con **Type Guards** (`is`), validadores de esquema (**Zod**) o comprobaciones de instancia (`instanceof`).
2. **`noUncheckedIndexedAccess` Activo:**
   - El acceso a elementos de arrays o diccionarios (`record[key]` o `array[0]`) devuelve `T | undefined`. Siempre se debe verificar la existencia del elemento antes de consumirlo.
   - ✅ `const firstRole = roles[0]; if (firstRole) { ... }`
   - ❌ `const firstRoleName = roles[0].name; // Error TS`
3. **`exactOptionalPropertyTypes`:**
   - Las propiedades declaradas como opcionales (`name?: string`) no aceptan `undefined` explícito salvo que se declare expresamente (`name?: string | undefined`).
4. **`interface` vs `type`:**
   - **Usar `interface`:** Para props de componentes, contratos de dominio, contratos de servicios/APIs y cualquier entidad extensible (`extends`).
   - **Usar `type`:** Para uniones discriminadas (_discriminated unions_), tipos primitivos compuestos, tuplas, tipos de utilidad (`Pick`, `Omit`, `Record`) y retornos de Server Actions.
5. **Retornos Explícitos Obligatorios:**
   - Toda función de utilidad, helper, cliente de API y Server Action debe declarar su tipo de retorno explícitamente.

---

## 2. Nomenclatura, Convenciones y Estándares de Nombres

| Elemento                               | Convención                    | Ejemplo                                 | Razón / Regla                              |
| :------------------------------------- | :---------------------------- | :-------------------------------------- | :----------------------------------------- |
| **Componentes React**                  | `PascalCase`                  | `NeonButton.tsx`, `ProfileCard.tsx`     | Coincide con la etiqueta JSX exportada     |
| **Tipos / Interfaces**                 | `PascalCase`                  | `SessionUser`, `DiscordRole`            | Distinción clara frente a variables        |
| **Enums / Constantes globales**        | `UPPER_SNAKE_CASE`            | `MAX_RETRY_COUNT`, `DEFAULT_THEME`      | Inmutables y constantes de configuración   |
| **Funciones y métodos**                | `camelCase` (Verbo inicial)   | `getUserSession()`, `hasPermission()`   | Describe una acción o cálculo              |
| **Custom Hooks**                       | Prefijo `use` + `camelCase`   | `useDiscordRoles()`, `useMediaQuery()`  | Estándar de React Hook Linter              |
| **Archivos de código (`.ts`, `.tsx`)** | `kebab-case`                  | `neon-button.tsx`, `get-roles.ts`       | Evita problemas de case-sensitivity en SOs |
| **Carpetas de módulos y rutas**        | `kebab-case`                  | `features/auth/`, `app/dashboard/`      | Uniformidad en rutas URL y del sistema     |
| **Server Actions**                     | Prefijo verbal + `Action`     | `updateRoleAction()`, `banUserAction()` | Identificación inmediata de mutación       |
| **Esquemas Zod**                       | `camelCase` + sufijo `Schema` | `sessionUserSchema`, `loginFormSchema`  | Claridad entre tipo TS y validador runtime |

---

## 3. Orden Canónico de Importaciones

Las importaciones en cada archivo deben estar agrupadas y ordenadas estrictamente mediante la siguiente secuencia, separadas por una línea en blanco:

```tsx
// 1. React & Next.js Core
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Librerías de Terceros (UI, utilidades, iconos)
import { Slot } from '@radix-ui/react-slot';
import { Shield, Terminal, Zap } from 'lucide-react';
import { z } from 'zod';

// 3. Shared Modules (Infraestructura, Configuración, Componentes Base)
import { GlassCard, NeonButton } from '@/shared/components/cyber';
import { env } from '@/shared/config/env';
import { cn } from '@/shared/lib/utils';

// 4. Feature Modules (Public APIs de otros features o del feature actual)
import { useSession } from '@/features/auth';
import { RoleBadge } from '@/features/roles';

// 5. Imports Relativos Locales (Componentes, helpers locales del mismo módulo)
import { ProfileHeader } from './components/profile-header';
import { formatJoinDate } from './lib/format-date';

// 6. Types & Interfaces (Separación total con 'import type')
import type { DiscordRole, RoleHierarchy } from '@/features/roles';
import type { UserProfileProps } from './types';
```

---

## 4. Estándar de Componentes React & Next.js App Router

### 4.1. Anatomía Canónica de un Componente

- **Named Exports Obligatorios:** Prohibido el uso de `export default` salvo en archivos requeridos por Next.js (`page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`).
- **Tipado de Props con `interface`:** Toda prop se declara mediante `[NombreComponente]Props`.
- **Soporte de `className` y Composición:** Los componentes visuales siempre deben aceptar `className?: string` y fusionarlo mediante el helper [`cn()`](file:///C:/Users/luise/Documents/Proyectos/TNC%20Discord/TNC-DiscordGang-Front/TNC%20DiscordGang/docs/guidelines/01-estructura.md#L196).

```tsx
// src/shared/components/cyber/neon-button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/shared/lib/utils';

export interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'cyan' | 'magenta' | 'danger' | 'ghost-tactical';
  size?: 'sm' | 'md' | 'lg';
  isChamfered?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isChamfered = true,
      isLoading = false,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'font-display relative inline-flex items-center justify-center tracking-wider uppercase transition-all',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          isChamfered && 'clip-corner-br',
          // Variantes de color y glow
          variant === 'primary' &&
            'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:shadow-[var(--glow-primary-md)]',
          variant === 'cyan' &&
            'border border-[var(--color-cyan)] text-[var(--color-cyan)] hover:bg-[var(--color-cyan)]/10 hover:shadow-[var(--glow-cyan-md)]',
          variant === 'danger' &&
            'border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 hover:shadow-[var(--glow-danger-md)]',
          // Tamaños
          size === 'sm' && 'h-8 px-3 text-xs',
          size === 'md' && 'h-10 px-5 text-sm',
          size === 'lg' && 'h-12 px-7 text-base',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>CARGANDO...</span>
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

NeonButton.displayName = 'NeonButton';
```

---

## 5. Validación en Tiempo de Ejecución (Runtime Validation con Zod)

TypeScript valida únicamente en compilación. Todos los datos externos (variables de entorno, respuestas de backend, formularios, cookies de sesión) se validan en tiempo de ejecución con **Zod**.

### 5.1. Validación de Variables de Entorno (`src/shared/config/env.ts`)

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_DISCORD_CLIENT_ID: z.string().min(1),
  NEXT_PUBLIC_DISCORD_GUILD_ID: z.string().min(1),
  DISCORD_CLIENT_SECRET: z.string().min(1).optional(),
  SESSION_SECRET: z.string().min(32).optional(),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
  NEXT_PUBLIC_DISCORD_GUILD_ID: process.env.NEXT_PUBLIC_DISCORD_GUILD_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
});

if (!parsedEnv.success) {
  console.error('❌ Variables de entorno inválidas:', parsedEnv.error.flatten().fieldErrors);
  throw new Error('Variables de entorno mal configuradas en .env');
}

export const env = parsedEnv.data;
```

---

## 6. Patrón de Manejo de Errores y Resultados Tipados

### 6.1. Jerarquía de Errores Tipados (`src/shared/lib/errors.ts`)

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string = 'INTERNAL_ERROR',
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ApiError extends AppError {
  constructor(message: string, statusCode: number = 500, code: string = 'API_ERROR') {
    super(message, code, statusCode);
    this.name = 'ApiError';
  }
}

export class AuthError extends AppError {
  constructor(message: string = 'No autorizado / Sesión expirada') {
    super(message, 'AUTH_UNAUTHORIZED', 401);
    this.name = 'AuthError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Permisos insuficientes para esta operación') {
    super(message, 'AUTH_FORBIDDEN', 403);
    this.name = 'ForbiddenError';
  }
}
```

### 6.2. Patrón `Result<T, E>` para Server Actions

Las Server Actions nunca lanzan excepciones no controladas al cliente; retornan una unión discriminada tipada:

```typescript
export type ActionResult<TData, TError = string> =
  { success: true; data: TData; error?: never } | { success: false; error: TError; data?: never };

// Ejemplo de Server Action tipada
export async function syncGuildRolesAction(): Promise<ActionResult<{ syncedCount: number }>> {
  try {
    const result = await fetchRolesFromDiscord();
    return { success: true, data: { syncedCount: result.length } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al sincronizar roles';
    return { success: false, error: message };
  }
}
```

---

## 7. Configuración de ESLint y Prettier

### 7.1. Reglas Críticas de ESLint (`.eslintrc.json`)

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "react-hooks"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { "prefer": "type-imports", "fixStyle": "separate-type-imports" }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true,
        "allowHigherOrderFunctions": true,
        "allowDirectConstAssertionInArrowFunctions": true
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

---

## 8. Anti-Patrones Comunes y Soluciones

### ❌ Anti-Patrón 1: Aserciones forzadas con `as` (Type Casting inseguro)

```typescript
// ❌ Prohibido: Enmascara posibles errores de tipo
const user = data as SessionUser;
console.log(user.discordId.toUpperCase()); // Podría crashear si data es null/incompleto

// ✅ Correcto: Validación con Type Guard o Zod
const parsed = sessionUserSchema.safeParse(data);
if (!parsed.success) {
  throw new ValidationError('Estructura de usuario inválida');
}
const user = parsed.data; // user está 100% tipado y garantizado
```

### ❌ Anti-Patrón 2: Modificar props mutando objetos directos

```typescript
// ❌ Prohibido: Mutación directa de estado/prop
function addRole(user: SessionUser, newRole: string) {
  user.roles.push(newRole); // Mutación de objeto existente
}

// ✅ Correcto: Inmutabilidad estricta
function addRole(user: SessionUser, newRole: string): SessionUser {
  return {
    ...user,
    roles: [...user.roles, newRole],
  };
}
```

### ❌ Anti-Patrón 3: Comentarios redundantes y obvios

```typescript
// ❌ Prohibido
// Función que suma dos números y devuelve el resultado
function add(a: number, b: number): number {
  return a + b;
}

// ✅ Correcto: Solo documentar el por qué o restricciones de dominio
// Se aplica un offset de 4px para compensar el corte biselado de la tarjeta HUD
const HUD_OFFSET_PX = 4;
```
