# OptiAdvance HR — Web dashboard

## Purpose and identity

Web dashboard for employee self-service and HR operations. Product: **OptiAdvance HR**. Company: **OptiAdvance**. Public domain: `optiadvance.com`.

## Intended users

Employees, Managers, HR Administrators and Payroll Administrators. Mobile clients serve Employees and Managers; the web also serves HR Administrators and Payroll Administrators. All experiences operate inside a Tenant boundary.

## Architecture and stack

Initialized: Next.js 16.3.5 (App Router, Turbopack) on React 19.3.0, TypeScript strict mode, Tailwind CSS v4, and tRPC (`@trpc/server`, `@trpc/client`, `@trpc/react-query`) with TanStack Query as the web app's internal, typed API layer — see [ADR-0004](docs/decisions/ADR-0004-trpc-for-web-internal-api.md). React Server Components are the default, with Client Components for interactivity or browser APIs.

Still planned, not yet added: React Hook Form with Zod (Zod itself is already a dependency via tRPC), TanStack Table, Framer Motion with reduced-motion support, Storybook and MSW, Vitest, React Testing Library and Playwright.

Clients share API contracts and semantic design tokens, not UI source code. The web app's tRPC layer is internal to this app; it does not replace the OpenAPI contract shared with the backend and mobile clients (see [workspace coordination](../WORKSPACE.md)). Backend services enforce capabilities and tenant isolation. Client rendering never grants authority.

## Directory map and documentation index

- [Architecture](ARCHITECTURE.md), [security](SECURITY.md), [contribution guide](CONTRIBUTING.md) and [changelog](CHANGELOG.md)
- [Decision log](docs/decisions/README.md)
- [Getting started](docs/getting-started.md), [testing](TESTING.md) and [release process](docs/release-process.md)
- `src/app`: route composition (`(public)`, `(authenticated)/{employee,manager,hr-admin,payroll-admin}`, `api/trpc/[trpc]`)
- `src/features`, `src/components`, `src/design-system`: business workflows and reusable rendering (placeholders pending implementation)
- `src/lib/api/trpc`: tRPC router, context and providers; other `src/lib/*` boundaries remain placeholders
- `docs/`: client implementation guidance and decisions

## Local-development status

Initialized: `npm install`, `npm run dev`, `npm run build` and `npm run lint` are runnable. Only the app shell, persona route stubs and the tRPC round trip (`system.health`) exist; business features under `src/features` are not implemented. Pipeline, deployment and remaining toolchain (testing, Storybook) are still TBD in the decision log. Each sibling repository will have independent Git history and releases; Git is not yet initialized for this repository.

## Security and contribution

Never commit secrets or real employee, payroll, medical, attendance, document or location data. Use synthetic fixtures. Follow [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.

## License

TBD. No license has been selected or implied.
