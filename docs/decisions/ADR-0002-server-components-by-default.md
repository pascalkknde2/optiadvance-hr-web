# ADR-0002: Server Components by default

- Status: Proposed
- Date: 2026-09-21
- Decision owners: TBD; formal approval has not occurred.

## Context

Sensitive data and initial rendering should remain on the server where practical.

## Decision

Use React Server Components by default; add Client Components only for interactivity or browser APIs, passing minimal serializable props.

## Alternatives considered

Client-rendering everything increases browser exposure and payloads; server-only rendering cannot handle required interactive state.

## Consequences

Server/client boundaries require careful dependency and cache design.

## Security and privacy impact

Do not serialize secrets or excessive employee fields; isolate caches by tenant/session and enforce authorization before reads.

## Rollback or replacement strategy

Move individual boundaries with privacy, performance and behavior evidence; preserve server-only secrets and authorization.

## References

[Repository architecture](../../ARCHITECTURE.md) and [platform decisions](../../../optiadvance-hr-platform/docs/architecture/decisions/README.md)
