# Architecture

## Goals

Support all four personas with accessible administration and secure data boundaries.

## Constraints

Next.js App Router, React and TypeScript strict mode. Server Components by default; Client Components only for interactivity or browser APIs. No authentication tokens in localStorage and no redundant copying of TanStack Query data into component state. tRPC is the app's internal typed API layer over TanStack Query ([ADR-0004](docs/decisions/ADR-0004-trpc-for-web-internal-api.md)); it does not replace the cross-client OpenAPI contract.

## Context boundaries

app owns route composition; features owns business workflows; components and design-system own reusable rendering; lib owns API, session, authorization and observability boundaries.

## Layer responsibilities

Server Components load initial data through server-only adapters. Client Components handle interaction. React Hook Form and Zod manage forms; backend domain services validate business rules and enforce authority.

## Dependency direction

Routes compose features; features depend on narrow lib interfaces and reusable components. Shared components must not depend on feature internals. Server-only modules must never be imported into browser code.

## State and event flow

URL search parameters represent shareable filtering, sorting and pagination. TanStack Query owns interactive server state; local state owns transient interaction and form drafts. Mutations invalidate scoped queries or reconcile authoritative responses.

## Navigation approach

App Router segments model public, authenticated and persona entry points. Route names do not grant permission. Recheck sessions and capabilities on every protected server action, handler and backend operation.

## Networking and persistence boundaries

Server requests use server-only API adapters (tRPC's in-process caller, `src/lib/api/trpc/server.ts`, for Server Components); interactive fetching uses tRPC's TanStack Query hooks (`src/lib/api/trpc/react.tsx`). Explicitly scope caches by tenant, session and capability context, and use private/no-store behavior for sensitive responses as appropriate.

## Error model

Map contract errors to field validation or accessible status feedback. Route error boundaries handle unexpected faults without exposing payloads or stack traces; preserve offline and stale indicators.

## Security boundaries

Use Secure HttpOnly cookie-based sessions where supported, with CSRF and session rotation policy. Enforce authorization in the server layer and backend; prevent cross-tenant cache leakage.

## Test strategy

Vitest, React Testing Library and MSW cover component behavior; Playwright verifies critical journeys, server authorization, accessibility and session isolation.

## Known trade-offs

Server-first rendering reduces browser exposure but adds server/client coordination. TanStack Query applies only where interactive server state warrants it; framework versions are pinned (Next.js 16.3.5, React 19.3.0 — see `package.json`) but cache policy is still TBD.

Every client must support loading, empty, error, unauthorized, offline and stale-data states. Use integer minor units with ISO 4217 currency codes; store timestamps in UTC and retain IANA timezones for business interpretation.

## Architecture decisions

See the [decision log](docs/decisions/README.md). All initial ADRs are Proposed pending formal owner approval.
