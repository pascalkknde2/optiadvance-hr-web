# Contributing

## Prerequisites

Toolchain versions, repository access, required approvals and maintainer assignments are TBD in the [decision log](docs/decisions/README.md). At this stage use a UTF-8 Markdown editor; no application build is available. Read [architecture](ARCHITECTURE.md) and [security](SECURITY.md).

## Branches and commits

Use `feat/<short-topic>`, `fix/<short-topic>` or `docs/<short-topic>` branches. Use Conventional Commits such as `docs: clarify tenant boundaries`; mark breaking contract changes explicitly. Keep PRs focused and avoid unrelated formatting changes.

## Pull-request checklist

- Describe the problem, resulting behavior and affected repositories; link the feature specification and ADRs.
- Include validation results or explain why a check is unavailable.
- Check tenant isolation, capability enforcement, accessibility and all relevant loading, empty, error, unauthorized, offline and stale-data states.
- Update documentation, the Unreleased changelog and compatibility matrix when applicable.
- Confirm no secrets or real employee data appear in code, fixtures or screenshots.
- Document rollback and unresolved decisions; obtain relevant owners' reviews (review thresholds TBD).

## Required testing

Plan Vitest and React Testing Library component tests, MSW contract-shaped fixtures and Playwright critical journeys. Documentation-only changes need path, link and consistency checks. Executable checks become mandatory once implementation exists; no test result is implied by a written strategy.

## Security review triggers

Request security review for authentication, authorization, tenant switching, persistence, offline writes, exports, payroll, medical, document or location processing, new dependencies and analytics. Private vulnerability reports follow [SECURITY.md](SECURITY.md).

## Cross-repository contracts

Follow [workspace coordination](../WORKSPACE.md). Propose OpenAPI and shared token changes in the platform first; link affected client and backend PRs, verify backward compatibility and contract tests, agree rollout order and update the compatibility matrix. Decisions affecting two or more clients belong in platform ADRs; client-only decisions stay local. Do not approve your own assumptions as accepted ADRs.
