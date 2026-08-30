# Directriz 04 — Testing y Calidad

Guía obligatoria de pruebas y control de calidad para el **Frontend TNC DiscordGang**.

---

## 1. Estrategia de Testing

- **Unit / Component:** **Vitest** + **React Testing Library** para lógica (`features/*/lib/`, `shared/lib/`, `hooks/`) y componentes.
- **E2E:** **Playwright** (opcional, se incorpora en fases posteriores).

## 2. Qué Testear

- **Componentes (shadcn / dominio):**
  - Render básico.
  - Interacciones (click, hover, teclado).
  - Estados: vacío, error y loading.
- **Lógica de negocio (`features/*/lib/`, `features/*/hooks/`, `features/*/config/`, `shared/lib/`):**
  - Helpers de roles y permisos.
  - Cliente de API (fetch) con mocks.
  - Utils (`cn`, formatos de fecha).

## 3. Umbrales de Cobertura Mínimos

- Lógica de negocio (`features/*/lib/`, `features/*/hooks/`, `shared/lib/`): **70%**.
- Componentes: **50%**.

## 4. Gate de Calidad

Ejecutar de forma obligatoria antes de cada Pull Request:

```bash
npm run lint
npm run typecheck
npm run test
```

- `typecheck` ejecuta `tsc --noEmit`.
- `test` ejecuta Vitest en modo _watch_ solo en desarrollo; en CI/PR en modo `run`.

## 5. Reglas Estrictas

1. Los tests no dependen de la red ni de servicios externos; usar mocks/fixtures.
2. Los mocks se definen con `vi.mock` y se resetean en `beforeEach`.
3. Evitar tests frágiles atados a selectores CSS; usar `getByRole`, `getByLabelText`, etc.
4. El _Definition of Done_ incluye `format`, `lint` y `build` además de los tests.
