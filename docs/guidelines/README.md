# Directrices de Desarrollo y Arquitectura — TNC DiscordGang Frontend

Este directorio centraliza los estándares técnicos, patrones de diseño y normas operativas obligatorias para cualquier desarrollador o agente de IA (**Kilo**) que contribuya en este repositorio. El punto de entrada principal está sincronizado con el archivo [`AGENTS.md`](../../AGENTS.md) ubicado en la raíz del proyecto.

---

## 1. Convenciones de Nomenclatura y Versionado de Guías

- **Estructura de Archivos:** Todo documento dentro de este directorio debe seguir el formato `NN-tema.md`.
- **Prefijo Secuencial:** `NN` corresponde a dos dígitos incrementales (`01`, `02`, `03`, ...).
- **Idioma y Formato:** Nombres estrictamente en **español** y utilizando formato **kebab-case** (ej. `06-accesibilidad.md`).

---

## 2. Índice de Módulos Técnicos

| Documento                              | Alcance y Contenido Principal                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`01-estructura.md`](01-estructura.md) | Estructura Feature-First, módulos por funcionalidad en `src/features/` y Atomic Design.          |
| [`02-estilo.md`](02-estilo.md)         | Estándares de TypeScript estricto, ESLint/Prettier y convenciones de _naming_.                   |
| [`03-git.md`](03-git.md)               | Estrategia de ramas (Git Flow), Conventional Commits en español y políticas de Pull Request.     |
| [`04-calidad.md`](04-calidad.md)       | Estrategia de testing (Vitest + RTL), umbrales de cobertura y gate de calidad.                   |
| [`05-diseno.md`](05-diseno.md)         | Sistema de diseño cyberpunk 100% con CSS variables en `globals.css` y componentes reutilizables. |

---

## 3. Protocolo de Modificación y Extensión

1. **Adición de Nuevas Normas:** Al introducir una directriz nueva (ej. accesibilidad, i18n o PWA), asigne el correlativo numérico inmediato superior (`06-*.md`).
2. **Sincronización Bidireccional:** Todo cambio estructural o adición de directrices debe actualizar de forma obligatoria tanto la tabla de este archivo como la sección de referencias en el `AGENTS.md` raíz.
3. **Revisión de Impacto:** Las modificaciones a estándares existentes deben validarse para garantizar que el código ya generado continúe cumpliendo con el _Definition of Done_ del proyecto.
