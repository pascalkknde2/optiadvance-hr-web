# Architecture decision log

All initial ADRs are **Proposed**. The bootstrap records direction requested for OptiAdvance HR, not formal organizational approval. Assign decision owners, review alternatives and record explicit approval before changing status. Supersede accepted decisions with a new ADR rather than hiding their history.

## Proposed ADRs

| Decision | Status |
| --- | --- |
| [ADR-0001: Next.js App Router](ADR-0001-nextjs-app-router.md) | Proposed |
| [ADR-0002: Server Components by default](ADR-0002-server-components-by-default.md) | Proposed |
| [ADR-0003: TanStack Query for client server state](ADR-0003-tanstack-query-for-client-server-state.md) | Proposed |
| [ADR-0004: tRPC for the web app's internal API layer](ADR-0004-trpc-for-web-internal-api.md) | Proposed |

## Unresolved decisions

| ID | Unresolved decision | Owner / gate |
| --- | --- | --- |
| WEB-01 | Node version, browser support and prerequisites beyond the initialized toolchain (Next.js 16.3.5, React 19.3.0, pnpm 10.20.0 — see `package.json`) | TBD / before related implementation |
| WEB-02 | Hosting/runtime, actual route layout, server/client query hydration and cache policy | TBD / before related implementation |
| WEB-03 | Session integration, cookie/CSRF choices, headers/CSP and server-only module enforcement | TBD / before related implementation |
| WEB-04 | Storybook/addon versions, visual review tooling, test browser matrix and release ownership | TBD / before related implementation |

Shared identifiers, security, privacy, contract, licensing and governance decisions remain in the [platform decision log](../../../optiadvance-hr-platform/docs/architecture/decisions/README.md).

Every new TBD must be linked to an entry here or the shared platform log. Resolve entries with an owner, date and ADR or approved specification; unassigned items remain open.
