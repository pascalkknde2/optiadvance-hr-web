# ADR-0004: tRPC for the web app's internal API layer

- Status: Proposed
- Date: 2026-09-22
- Decision owners: TBD; formal approval has not occurred.

## Context

Server Components need typed initial data loads and Client Components need typed
interactive server state on top of TanStack Query ([ADR-0003](ADR-0003-tanstack-query-for-client-server-state.md)).
The platform's cross-client contract is OpenAPI, shared with the Android and iOS
clients and the backend (see [workspace coordination](../../../WORKSPACE.md)); that
contract is not being replaced.

## Decision

Use tRPC (`@trpc/server`, `@trpc/client`, `@trpc/react-query`) as the web app's own
internal API layer only: a typed boundary between this Next.js app's Server/Client
Components and its route handlers, mounted at `src/app/api/trpc/[trpc]` and defined
under `src/lib/api/trpc`. Feature routers compose into one `appRouter` (`router.ts`)
as `src/features/*` implement business workflows. Server Components call the router
in-process via `getServerTrpc()` (`src/lib/api/trpc/server.ts`); Client Components use
the `api` hooks from `src/lib/api/trpc/react.tsx` through `TRPCProvider`. `superjson`
is the wire transformer so dates and other non-JSON values survive serialization.

tRPC procedures in this app either implement web-only aggregation/view logic or proxy
to the shared backend contract; they do not become the contract Android/iOS consume.
Any capability the mobile clients also need still goes through the OpenAPI contract.

## Alternatives considered

Calling backend OpenAPI endpoints directly from Server Components with hand-written
fetch adapters and manually typed TanStack Query hooks. Rejected for this internal
layer because it duplicates request/response types across the client boundary that
tRPC infers automatically; the backend-facing OpenAPI contract is unaffected either
way.

## Consequences

Adds `@trpc/*`, `superjson`, and `server-only` as dependencies (see
`package.json`, `README.md` stack section). Route handler exists at
`/api/trpc/[trpc]`; procedures must still enforce session/capability checks
independent of the fetch/RSC path used to reach them (`protectedProcedure` in
`src/lib/api/trpc/trpc.ts` is a stub pending [WEB-03](README.md)). Exact router
composition per feature is TBD as `src/features/*` are implemented.

## Security and privacy impact

`protectedProcedure` throws `UNAUTHORIZED` when no session is present, but session
population itself is unresolved ([WEB-03](README.md)); no procedure should be treated
as authorization-complete until that ADR lands. Tenant scoping must be enforced in
context/procedure logic, not inferred from route placement.

## Rollback or replacement strategy

The router boundary is isolated under `src/lib/api/trpc`; replacing it with direct
OpenAPI-typed fetch calls would touch call sites in `src/features/*` and the two
provider files but not the backend contract.

## References

[Architecture](../../ARCHITECTURE.md), [data fetching and caching](../data-fetching-and-caching.md),
[ADR-0003](ADR-0003-tanstack-query-for-client-server-state.md)
