# Getting started

## Current status

Initialized: Next.js 16.3.5 (App Router, Turbopack), React 19.3.0, TypeScript strict mode, Tailwind CSS v4 and tRPC over TanStack Query, managed with pnpm (pinned via `packageManager` in `package.json`). Only the app shell, persona route stubs (`(public)`, `(authenticated)/{employee,manager,hr-admin,payroll-admin}`) and one demo tRPC procedure (`system.health`) exist; `src/features/*` business workflows are still empty placeholders.

## Local commands

```
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

## Review sequence

1. Read [README](../README.md), [architecture](../ARCHITECTURE.md) and [security](../SECURITY.md).
2. Review [decisions](decisions/README.md), including [ADR-0004](decisions/ADR-0004-trpc-for-web-internal-api.md) for the tRPC boundary.
3. Confirm remaining toolchain items (Node version pin, testing/Storybook toolchain) — TBD in the decision log.
4. Follow [contribution guidance](../CONTRIBUTING.md) before implementing a feature under `src/features`.

Proposed web host: `hr.optiadvance.com`. Proposed API host: `api.hr.optiadvance.com`. These are unconfirmed and do not imply registration or provisioning. Use synthetic data only. License selection remains TBD in the platform decision log.
