# Directriz 03 — Flujo de Trabajo Git

Guía obligatoria de control de versiones para el **Frontend TNC DiscordGang**.

---

## 1. Conventional Commits

Todos los mensajes de commit siguen la especificación **Conventional Commits**, en **español**:

| Tipo        | Uso                                     |
| ----------- | --------------------------------------- |
| `feat:`     | Nueva funcionalidad                     |
| `fix:`      | Corrección de errores                   |
| `chore:`    | Tareas de mantenimiento, dependencias   |
| `refactor:` | Cambios que no alteran comportamiento   |
| `docs:`     | Documentación                           |
| `style:`    | Formato, estilos de código (sin lógica) |
| `perf:`     | Mejoras de rendimiento                  |
| `test:`     | Añadir o modificar tests                |

Formato: `tipo(ámbito): descripción en español` — ej. `feat(auth): añade callback OAuth de Discord`.

## 2. Estrategia de Ramas

- `main` — producción (estable).
- `develop` — integración (fuente de features).
- `feature/<nombre>` — nuevas funcionalidades (se ramifica de `develop`).
- `fix/<nombre>` — correcciones de errores.

**Prohibido** commit directo a `main` o `develop`; todo cambio entra vía Pull Request.

## 3. Política de Pull Requests

- Descripción clara del cambio y su motivación.
- Screenshots o capturas cuando el cambio sea visual.
- Checklist de Definition of Done:
  - `npm run format`
  - `npm run lint`
  - `npm run build`
- Al menos una revisión antes de merge.

## 4. Reglas Estrictas

1. **Nunca** ejecutar `git push --force` ni reescribir historia compartida.
2. **Nunca** commitear secretos, `.env` o artefactos de build (`node_modules`, `.next`).
3. No dejar dependencias rotas ni archivos temporales en los commits.
4. El agente de IA no ejecuta `git commit` ni `git push` de forma autónoma (ver AGENTS.md).
