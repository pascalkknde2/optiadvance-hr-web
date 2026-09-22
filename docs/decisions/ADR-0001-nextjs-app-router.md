# ADR-0001: Next.js App Router

- Status: Proposed
- Date: 2026-09-21
- Decision owners: TBD; formal approval has not occurred.

## Context

The web serves self-service and multiple administrator workflows with server-rendered entry points.

## Decision

Use Next.js App Router, React and TypeScript strict mode with explicit server/client boundaries.

## Alternatives considered

A client-only SPA shifts more session/data work into the browser; other server frameworks would require reevaluating the chosen stack.

## Consequences

Framework/toolchain versions and deployment runtime remain TBD. Blueprint route folders are not initialized routes.

## Security and privacy impact

Server handlers and backend services enforce tenant/capability checks independently of layouts.

## Rollback or replacement strategy

Replace routing incrementally behind stable API contracts with redirect, session and authorization tests.

## References

[Repository architecture](../../ARCHITECTURE.md) and [platform decisions](../../../optiadvance-hr-platform/docs/architecture/decisions/README.md)
