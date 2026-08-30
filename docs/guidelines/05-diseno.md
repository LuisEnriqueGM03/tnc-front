# Directriz 05 — Sistema de Diseño Cyberpunk y Tokens Visuales (CSS Variables)

Guía oficial, exhaustiva y obligatoria de arquitectura visual, tokens, micro-interacciones y componentes de interfaz para el Frontend **TNC DiscordGang**.

---

## 1. Filosofía Visual y Principios de Diseño

El diseño de **TNC DiscordGang** adopta una estética **Ultra-Modern Dark Cyberpunk / Tactical HUD**, inspirada en interfaces de comando militar de ciencia ficción, telemetría cibernética (_Blade Runner_, _Ghost in the Shell_, _Cyberpunk 2077_) y consolas tácticas de alta fidelidad.

```
┌────────────────────────────────────────────────────────────────────────┐
│  [SYS // TNC-DISCORDGANG-HUD v2.4]           STATUS: OPTIMAL [● ONLINE] │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ ❯ 80% DARK VOID (Superficies oscuras puras y bajo ruido visual)  │  │
│  │ ❯ 15% SMOKED GLASS (Acrílico ahumado, biselados y micro-bordes)  │  │
│  │ ❯ 05% NEON REACTIVE (Láseres, pulsos de estado y glow selectivo)│  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Principios Innegociables:

1. **La Regla Áurea del Balance Lumínico (80 / 15 / 5):**
   - **80% Negro Profundo / Void:** Fondos oscuros (`#030305`, `#070811`) que descansan la vista y maximizan el contraste.
   - **15% Superficies Tácticas & Cristal Ahumado:** Paneles translúcidos con desenfoque multicapa (_glassmorphism_), mallas y micro-bordes estructurales.
   - **5% Acentos Neón de Alto Impacto:** Iluminación láser focalizada reservada exclusivamente para acciones primarias, estados críticos, insignias de rol y elementos interactivos.
2. **Tokens como Única Fuente de Verdad:** Queda estrictamente prohibido el uso de valores hexadecimales, `rgb()`, `hsl()` o valores arbitrarios sueltos en componentes o clases Tailwind. Todo color, radio, sombra, desenfoque o curva de animación se consume vía `var(--*)` definida en `src/app/globals.css`.
3. **Física de Luz y Luminiscencia Reactiva (_Glow Hierarchy_):** Las luces no son estáticas; reaccionan a la interacción del usuario mediante aceleraciones mecánicas, micro-pulsaciones sonares y gradientes luminiscentes.
4. **Geometría Mecánica y Biselados (_Hard Surface Design_):** En lugar de bordes completamente redondeados genéricos, se favorecen cortes angulares poligonales (_chamfered corners_), retículas de esquina tipo visor HUD `[ + ]` y mallas de perspectiva espacial.
5. **Legibilidad y Accesibilidad Cibernética:** Todo elemento interactivo y texto informativo debe cumplir estándares de contraste de alto rango (WCAG AAA en información crítica). Se debe respetar la preferencia de usuario `@media (prefers-reduced-motion: reduce)`.

---

## 2. Catálogo Maestro de Tokens de Diseño (`src/app/globals.css`)

### 2.1. Superficies, Fondos y Profundidad Espacial

La jerarquía de capas genera sensación de profundidad tridimensional mediante niveles de elevación oscurecidos y translúcidos.

| Token CSS                  | Descripción / Rol Visual                  | Valor Base                  |
| :------------------------- | :---------------------------------------- | :-------------------------- |
| `--color-background`       | Fondo global absoluto (Void)              | `#030305`                   |
| `--color-surface-abyss`    | Fondo de nivel inferior / canvas base     | `#070811`                   |
| `--color-surface`          | Fondo estándar de contenedores y paneles  | `#0B0D19`                   |
| `--color-surface-elevated` | Superficies elevadas (dropdowns, modales) | `#121528`                   |
| `--color-surface-hover`    | Estado hover de tarjetas e interactivos   | `#191D38`                   |
| `--color-surface-active`   | Estado presionado / activo                | `#202547`                   |
| `--color-border-subtle`    | Bordes estructurales pasivos              | `rgba(255, 255, 255, 0.06)` |
| `--color-border-default`   | Bordes estándar de paneles y tarjetas     | `rgba(255, 255, 255, 0.12)` |
| `--color-border-glow`      | Bordes enfocados o con energía activa     | `rgba(250, 204, 21, 0.45)`  |
| `--color-border-cyan`      | Bordes tácticos / HUD alternativo         | `rgba(0, 240, 255, 0.45)`   |

### 2.2. Tipografía y Jerarquía Textual

| Token CSS                  | Propósito                              | Valor Base |
| :------------------------- | :------------------------------------- | :--------- |
| `--color-foreground`       | Texto principal de máxima luminancia   | `#FFFFFF`  |
| `--color-foreground-muted` | Texto de lectura estándar y subtítulos | `#CBD5E1`  |
| `--color-muted`            | Etiquetas HUD, metadatos y timestamps  | `#64748B`  |
| `--color-disabled`         | Elementos inactivos / desconectados    | `#334155`  |

#### Familias Tipográficas Oficiales:

- **`--font-display` (`Orbitron, sans-serif`):** Uso exclusivo para títulos principales (`H1`, `H2`), contadores numéricos HUD, encabezados en `UPPERCASE` y códigos de estado.
- **`--font-sans` (`Rajdhani, sans-serif`):** Tipografía técnica y estilizada para cuerpo de texto, botones, navegación, tablas y descripciones.
- **`--font-mono` (`JetBrains Mono, monospace`):** Para identificadores de Discord (Snowflakes), hashes, logs del sistema, consola de comandos y telemetría de red.

### 2.3. Acentos Neón Cromáticos y Semántica Táctica

| Token CSS                | Color / Concepto      | Hex       | Uso Semántico Principal                                  |
| :----------------------- | :-------------------- | :-------- | :------------------------------------------------------- |
| `--color-primary`        | **Neon Cyber Yellow** | `#FACC15` | Identidad TNC, CTAs principales, estado seleccionado     |
| `--color-primary-bright` | **Hyper Yellow Core** | `#FFE600` | Punto de calor y foco lumínico en hover/active           |
| `--color-cyan`           | **Electric Cyan HUD** | `#00F0FF` | Telemetría táctica, filtros, datos biométricos           |
| `--color-magenta`        | **Synthwave Magenta** | `#FF007F` | Nivel VIP, eventos especiales, insignias élite           |
| `--color-purple`         | **Void Purple**       | `#8B5CF6` | Sub-roles místicos, badges secundarios, acento ambiental |
| `--color-success`        | **Hyper Emerald**     | `#00FF9D` | Conectado, bot online, sincronización correcta           |
| `--color-warning`        | **Tactical Amber**    | `#FF9E00` | Advertencias de moderación, cooldowns, avisos            |
| `--color-danger`         | **Crimson Glitch**    | `#FF2A55` | Sanciones, ban, fallos de red, destrucción de datos      |

### 2.4. Sistema de Luz, Halos y Resplandor (_Multi-Tier Glow Physics_)

Los efectos de luz combinan múltiples capas de difusión radial para simular tubos de gas neón y condensadores de plasma realistas.

| Token CSS             | Definición de Sombra / Halos de Luz                                    |
| :-------------------- | :--------------------------------------------------------------------- |
| `--glow-primary-sm`   | `0 0 6px rgba(250, 204, 21, 0.35), 0 0 12px rgba(250, 204, 21, 0.15)`  |
| `--glow-primary-md`   | `0 0 14px rgba(250, 204, 21, 0.50), 0 0 28px rgba(250, 204, 21, 0.25)` |
| `--glow-primary-lg`   | `0 0 22px rgba(250, 204, 21, 0.70), 0 0 45px rgba(250, 204, 21, 0.40)` |
| `--glow-cyan-sm`      | `0 0 6px rgba(0, 240, 255, 0.35), 0 0 12px rgba(0, 240, 255, 0.15)`    |
| `--glow-cyan-md`      | `0 0 14px rgba(0, 240, 255, 0.55), 0 0 30px rgba(0, 240, 255, 0.25)`   |
| `--glow-magenta-md`   | `0 0 14px rgba(255, 0, 127, 0.55), 0 0 30px rgba(255, 0, 127, 0.25)`   |
| `--glow-danger-md`    | `0 0 14px rgba(255, 42, 85, 0.55), 0 0 30px rgba(255, 42, 85, 0.25)`   |
| `--glow-success-md`   | `0 0 14px rgba(0, 255, 157, 0.55), 0 0 30px rgba(0, 255, 157, 0.25)`   |
| `--glow-text-primary` | `0 0 8px rgba(250, 204, 21, 0.6), 0 0 16px rgba(250, 204, 21, 0.3)`    |
| `--glow-text-cyan`    | `0 0 8px rgba(0, 240, 255, 0.6), 0 0 16px rgba(0, 240, 255, 0.3)`      |

### 2.5. Acabados Glassmorphism Táctico (_Smoked Acrylic_)

Superficies translúcidas con absorción lumínica para contrastar los elementos superpuestos con los efectos de fondo.

| Token CSS                  | Definición                  | Propósito de Uso                                 |
| :------------------------- | :-------------------------- | :----------------------------------------------- |
| `--glass-bg-subtle`        | `rgba(11, 13, 25, 0.45)`    | Capas de tarjetas secundarias                    |
| `--glass-bg`               | `rgba(11, 13, 25, 0.72)`    | Fondo estándar de paneles tácticos               |
| `--glass-bg-dense`         | `rgba(7, 8, 17, 0.90)`      | Modales, sidebars y menús flotantes              |
| `--glass-border`           | `rgba(255, 255, 255, 0.08)` | Borde de cristal delimitador estándar            |
| `--glass-border-highlight` | `rgba(255, 255, 255, 0.18)` | Borde superior reflectante (simulación de bisel) |
| `--glass-blur-sm`          | `blur(8px)`                 | Tooltips y badges                                |
| `--glass-blur-md`          | `blur(16px)`                | Tarjetas y contenedores                          |
| `--glass-blur-lg`          | `blur(32px)`                | Diálogos, overlays y paneles de comando          |

### 2.6. Geometría, Rejillas y Aceleración Mecánica

| Token CSS              | Valor                           | Descripción                                 |
| :--------------------- | :------------------------------ | :------------------------------------------ |
| `--radius-tactical-xs` | `2px`                           | Badges compactos y chip tags                |
| `--radius-tactical-sm` | `4px`                           | Botones secundarios e inputs                |
| `--radius-tactical-md` | `8px`                           | Paneles con esquinas no recortadas          |
| `--grid-color`         | `rgba(0, 240, 255, 0.04)`       | Cuadrícula de matriz de fondo               |
| `--grid-size`          | `32px`                          | Paso de rejilla táctica espacial            |
| `--ease-cyber-snap`    | `cubic-bezier(0.16, 1, 0.3, 1)` | Aceleración de enganche mecánico (snappy)   |
| `--ease-glitch`        | `steps(3, end)`                 | Transición entrecortada para micro-glitches |
| `--duration-instant`   | `80ms`                          | Respuestas de clic / micro-feedback         |
| `--duration-snappy`    | `180ms`                         | Efectos hover, focos y desplazamientos      |
| `--duration-smooth`    | `320ms`                         | Apertura de paneles, colapsos y modales     |

---

## 3. Efectos, Utilidades y Clases Especiales Cyberpunk

### 3.1. Biselado Poligonal Táctico (_Chamfered Corners / Clip-Paths_)

Permite que los contenedores y botones tengan esquinas recortadas a 45 grados, emulando placas de blindaje táctico.

```css
/* Esquina inferior derecha biselada (Estándar de Botones y Badges) */
.clip-corner-br {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
}

/* Esquinas opuestas biseladas: Superior Izquierda e Inferior Derecha (Tarjetas HUD) */
.clip-corner-tl-br {
  clip-path: polygon(
    12px 0,
    100% 0,
    100% calc(100% - 12px),
    calc(100% - 12px) 100%,
    0 100%,
    0 12px
  );
}

/* Las 4 esquinas biseladas (Insignias Militares y Chips VIP) */
.clip-corner-all {
  clip-path: polygon(
    8px 0,
    calc(100% - 8px) 0,
    100% 8px,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    8px 100%,
    0 calc(100% - 8px),
    0 8px
  );
}
```

---

### 3.2. Retículas y Esquinas HUD (_Tactical HUD Corner Brackets_)

Añade marcas de mira táctica `[ + ]` en las esquinas de tarjetas o contenedores mediante pseudo-elementos limpios.

```css
.hud-brackets {
  position: relative;
}

.hud-brackets::before,
.hud-brackets::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: var(--color-cyan);
  pointer-events: none;
  transition: all var(--duration-snappy) var(--ease-cyber-snap);
}

.hud-brackets::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid var(--color-cyan);
  border-left: 2px solid var(--color-cyan);
}

.hud-brackets::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid var(--color-cyan);
  border-right: 2px solid var(--color-cyan);
}

.hud-brackets:hover::before,
.hud-brackets:hover::after {
  width: 14px;
  height: 14px;
  border-color: var(--color-primary);
  filter: drop-shadow(0 0 4px var(--color-primary));
}
```

---

### 3.3. Cuadrícula de Fondo Cibernética (_Perspective Cyber Matrix_)

Estructura de fondo matricial con desvanecimiento radial para dar sensación de profundidad infinita.

```css
.cyber-grid-bg {
  background-image:
    linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
  mask-image: radial-gradient(circle at 50% 30%, black 20%, transparent 85%);
  -webkit-mask-image: radial-gradient(circle at 50% 30%, black 20%, transparent 85%);
}
```

---

### 3.4. Líneas de Escaneo CRT y Trama Analógica (_Scanline Overlay_)

Simula pantallas tácticas retro-futuristas de baja latencia con líneas horizontales ultra-sutiles.

```css
.scanlines-overlay {
  position: relative;
}

.scanlines-overlay::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  z-index: 20;
  pointer-events: none;
  opacity: 0.35;
}
```

---

### 3.5. Distorsión Cromática y Glitch de Texto (_RGB Split Effect_)

Efecto óptico de separación de canal rojo y cian para estados de alerta, títulos HUD o micro-estados hover.

```css
.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-text:hover {
  text-shadow:
    -2px 0 0 rgba(255, 42, 85, 0.75),
    2px 0 0 rgba(0, 240, 255, 0.75);
  animation: glitch-anim 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}

@keyframes glitch-anim {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 1px);
  }
  40% {
    transform: translate(-1px, -1px);
  }
  60% {
    transform: translate(2px, 0);
  }
  80% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(0);
  }
}
```

---

### 3.6. Pulso Sonar de Estado y Telemetría LED (_Sonar Pulse Indicator_)

Punto luminoso que emite ondas circulares concéntricas para indicar sincronización en vivo y conexión con el servidor.

```css
.status-pulse-online {
  position: relative;
  display: inline-flex;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: var(--color-success);
  box-shadow: var(--glow-success-md);
}

.status-pulse-online::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background-color: var(--color-success);
  animation: sonar-wave 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

@keyframes sonar-wave {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(3.2);
    opacity: 0;
  }
}
```

---

## 4. Especificación de Componentes Cyberpunk Oficiales

Todos los componentes del sistema de diseño viven en `src/shared/components/ui/cyber/` o `src/shared/components/ui/` y deben respetar las siguientes especificaciones:

### 4.1. `NeonButton` (`src/shared/components/ui/cyber/neon-button.tsx`)

El botón táctico principal con corte biselado, micro-brillo y respuesta háptica visual.

- **Variantes Disponibles:**
  - `primary`: Fondo oscuro, borde y texto en **Neon Yellow**, glow intenso en hover.
  - `cyan`: Estilo HUD táctico con acento **Electric Cyan**.
  - `magenta`: Estilo VIP / Élite con acento **Synthwave Magenta**.
  - `danger`: Acciones destructivas con acento **Crimson Glitch**.
  - `ghost-tactical`: Fondo transparente, bordes tenues y láser que recorre el contorno al interactuar.
- **Estados:**
  - _Default:_ Borde definido a 1px, texto uppercase en fuente `Rajdhani` con tracking expandido (`tracking-wider`).
  - _Hover:_ Elevación de luminosidad (`filter: brightness(1.2)`), activación de sombra `--glow-*-md` y ligera translación de 1px hacia arriba.
  - _Active:_ Snap mecánico inmediato (`scale(0.98)`), cambio a color `--color-primary-bright`.
  - _Disabled:_ Opacidad 40%, filtro en escala de grises, cursor bloqueado y patrón de rayas de seguridad (`repeating-linear-gradient`).

```tsx
// Ejemplo de Props e Interfaz Oficial
interface NeonButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'cyan' | 'magenta' | 'danger' | 'ghost-tactical';
  size?: 'sm' | 'md' | 'lg';
  isChamfered?: boolean; // Activa clip-corner-br
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

---

### 4.2. `GlassCard` / `TacticalPanel` (`src/shared/components/ui/cyber/glass-card.tsx`)

Contenedor base para agrupar módulos del dashboard, tarjetas de miembros y vistas de configuración.

- **Estructura Estándar:**
  1. **Línea Superior Reflectante (_Highlight Strip_):** Micro-borde superior de 1px con gradiente que simula luz incidente cenital.
  2. **Cuerpo Translúcido:** Fondo `--glass-bg` combinado con `--glass-blur-md`.
  3. **Esquinas Biseladas / HUD Reticles:** Esquina inferior derecha o superior izquierda cortada con `.clip-corner-tl-br` o rematada con `.hud-brackets`.
  4. **Cabecera HUD Integrada:** Espacio superior para título en `Orbitron`, indicador de telemetría y status badge.

```tsx
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glowing' | 'tactical';
  withBrackets?: boolean;
  withScanlines?: boolean;
  glowColor?: 'yellow' | 'cyan' | 'magenta' | 'danger';
}
```

---

### 4.3. `CyberBadge` & `RoleTag` (`src/shared/components/ui/cyber/cyber-badge.tsx`)

Insignias para categorizar roles de Discord, niveles de permiso y etiquetas de estado del sistema.

- **Características Visuales:**
  - Tipografía `--font-mono` en mayúsculas.
  - Punto de estado LED con pulso opcional.
  - Borde translúcido con color del rol y resplandor suave correspondiente.
  - Forma poligonal compacta (`.clip-corner-br` en 4px).

---

### 4.4. `CyberInput` & `TerminalInput` (`src/shared/components/ui/cyber/cyber-input.tsx`)

Campos de entrada de datos estilizados como terminales de comando.

- **Características Visuales:**
  - Prefijo visual tipo cursor de terminal `>_` o icono táctico monolineal.
  - Fondo `--color-surface-abyss` con borde sutil.
  - Al recibir foco (_focus-visible_): borde ilumina en `--color-cyan` con sombra `--glow-cyan-sm`, y una barra láser vertical parpadea brevemente.

---

### 4.5. `HUDStatusBar` (`src/shared/components/ui/cyber/hud-status-bar.tsx`)

Barra de telemetría superior o inferior presente en el layout del dashboard.

- **Indicadores:**
  - Hora del sistema en formato UTC / Tiempo de servidor sincronizado (`SYS TIME: 23:54:33 UTC`).
  - Estado de conexión con el Bot y WebSocket de Discord (`WS: CONNECTED [8ms]`).
  - Ruta de navegación en formato jerárquico de consola (`SYSTEM // CORE // ROLES_MANAGEMENT`).

---

## 5. Hoja de Estilos Maestra de Referencia (`src/app/globals.css`)

A continuación se detalla la configuración CSS global completa lista para operar con **Tailwind CSS v4** y Next.js App Router:

```css
@import 'tailwindcss';

:root {
  /* --- Superficies y Fondos Base --- */
  --color-background: #030305;
  --color-surface-abyss: #070811;
  --color-surface: #0b0d19;
  --color-surface-elevated: #121528;
  --color-surface-hover: #191d38;
  --color-surface-active: #202547;

  /* --- Textos y Foreground --- */
  --color-foreground: #ffffff;
  --color-foreground-muted: #cbd5e1;
  --color-muted: #64748b;
  --color-disabled: #334155;

  /* --- Bordes y Delimitadores --- */
  --color-border-subtle: rgba(255, 255, 255, 0.06);
  --color-border-default: rgba(255, 255, 255, 0.12);
  --color-border-glow: rgba(250, 204, 21, 0.45);
  --color-border-cyan: rgba(0, 240, 255, 0.45);

  /* --- Acentos Neón Cromáticos --- */
  --color-primary: #facc15;
  --color-primary-bright: #ffe600;
  --color-cyan: #00f0ff;
  --color-magenta: #ff007f;
  --color-purple: #8b5cf6;
  --color-success: #00ff9d;
  --color-warning: #ff9e00;
  --color-danger: #ff2a55;

  /* --- Halos y Sombras Glow --- */
  --glow-primary-sm: 0 0 6px rgba(250, 204, 21, 0.35), 0 0 12px rgba(250, 204, 21, 0.15);
  --glow-primary-md: 0 0 14px rgba(250, 204, 21, 0.5), 0 0 28px rgba(250, 204, 21, 0.25);
  --glow-primary-lg: 0 0 22px rgba(250, 204, 21, 0.7), 0 0 45px rgba(250, 204, 21, 0.4);
  --glow-cyan-sm: 0 0 6px rgba(0, 240, 255, 0.35), 0 0 12px rgba(0, 240, 255, 0.15);
  --glow-cyan-md: 0 0 14px rgba(0, 240, 255, 0.55), 0 0 30px rgba(0, 240, 255, 0.25);
  --glow-magenta-md: 0 0 14px rgba(255, 0, 127, 0.55), 0 0 30px rgba(255, 0, 127, 0.25);
  --glow-danger-md: 0 0 14px rgba(255, 42, 85, 0.55), 0 0 30px rgba(255, 42, 85, 0.25);
  --glow-success-md: 0 0 14px rgba(0, 255, 157, 0.55), 0 0 30px rgba(0, 255, 157, 0.25);

  /* --- Glassmorphism Táctico --- */
  --glass-bg-subtle: rgba(11, 13, 25, 0.45);
  --glass-bg: rgba(11, 13, 25, 0.72);
  --glass-bg-dense: rgba(7, 8, 17, 0.9);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-highlight: rgba(255, 255, 255, 0.18);
  --glass-blur-sm: blur(8px);
  --glass-blur-md: blur(16px);
  --glass-blur-lg: blur(32px);

  /* --- Tipografías --- */
  --font-display: 'Orbitron', sans-serif;
  --font-sans: 'Rajdhani', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* --- Rejillas, Radios y Cinemática --- */
  --grid-color: rgba(0, 240, 255, 0.04);
  --grid-size: 32px;
  --radius-tactical-xs: 2px;
  --radius-tactical-sm: 4px;
  --radius-tactical-md: 8px;
  --ease-cyber-snap: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-glitch: steps(3, end);
  --duration-instant: 80ms;
  --duration-snappy: 180ms;
  --duration-smooth: 320ms;
}

/* --- Clases de Utilidad Base Cyberpunk --- */

/* Recorte de esquinas táctico (Chamfered Corners) */
.clip-corner-br {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
}

.clip-corner-tl-br {
  clip-path: polygon(
    12px 0,
    100% 0,
    100% calc(100% - 12px),
    calc(100% - 12px) 100%,
    0 100%,
    0 12px
  );
}

.clip-corner-all {
  clip-path: polygon(
    8px 0,
    calc(100% - 8px) 0,
    100% 8px,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    8px 100%,
    0 calc(100% - 8px),
    0 8px
  );
}

/* Cristal ahumado con backdrop-filter */
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur-md);
  -webkit-backdrop-filter: var(--glass-blur-md);
  border: 1px solid var(--glass-border);
  box-shadow: inset 0 1px 0 0 var(--glass-border-highlight);
}

/* Efectos Glow Directos */
.glow-primary {
  box-shadow: var(--glow-primary-md);
}
.glow-cyan {
  box-shadow: var(--glow-cyan-md);
}
.glow-magenta {
  box-shadow: var(--glow-magenta-md);
}
.glow-danger {
  box-shadow: var(--glow-danger-md);
}
.glow-success {
  box-shadow: var(--glow-success-md);
}

/* Tipografía HUD Display */
.font-display {
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.font-sans-tech {
  font-family: var(--font-sans);
  letter-spacing: 0.03em;
}

.font-mono-data {
  font-family: var(--font-mono);
  letter-spacing: -0.02em;
}
```

---

## 6. Reglas de Composición Visual, Anti-Patrones y Accesibilidad

### 6.1. Reglas Innegociables de UI/UX

1. **Nunca superponer más de dos colores de acento neón en la misma tarjeta o componente:** Si una tarjeta utiliza borde `--color-cyan`, sus botones de acción deben ser neutros o de acento complementario `--color-primary`. La sobrecarga cromática destruye la jerarquía visual.
2. **Prohibido el uso de `--font-display` (`Orbitron`) en párrafos o textos de más de 6 palabras:** Orbitron se reserva exclusivamente para palabras clave, títulos de sección, contadores y códigos. Todo el cuerpo de lectura debe residir en `--font-sans` (`Rajdhani`).
3. **Todo resplandor (Glow) debe mantenerse acotado:** Evitar valores de `box-shadow` difusos superiores a 45px que opaquen el contenido legible o produzcan manchas de color excesivas sobre monitores calibrados con alto brillo.

### 6.2. Adaptación para Accesibilidad (`prefers-reduced-motion`)

El sistema desactiva automáticamente animaciones continuas de glitch, escaneos de líneas y pulsos sonares cuando el usuario tenga configurada la reducción de movimiento:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .scanlines-overlay::after {
    display: none !important;
  }
}
```
