# ADR-0003: TanStack Query for client server state

- Status: Proposed
- Date: 2026-09-21
- Decision owners: TBD; formal approval has not occurred.

## Context

Interactive screens need consistent request deduplication, invalidation and asynchronous state.

## Decision

Use TanStack Query when client-side server state is needed; keep shareable filters in URL search parameters and do not copy query data into redundant component state.

## Alternatives considered

Handwritten fetch state duplicates cache policy; using a global store for all server data adds manual invalidation.

## Consequences

Server-first reads remain appropriate; define hydration and query ownership per feature.

## Security and privacy impact

Tenant/session-scoped keys and cache clearing prevent stale private data leaking between sessions.

## Rollback or replacement strategy

Replace one feature’s query adapter at a time with equivalent invalidation, isolation and retry behavior.

## References

[Repository architecture](../../ARCHITECTURE.md) and [platform decisions](../../../optiadvance-hr-platform/docs/architecture/decisions/README.md)
