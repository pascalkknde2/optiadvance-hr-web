# Testing strategy

Use Vitest for validation and domain utilities, React Testing Library for interaction and accessible feedback, and MSW for deterministic contract-shaped responses. Playwright covers critical persona journeys, direct protected routes, server authorization and session/cache isolation. Storybook supplies visual state fixtures.

## Required scenarios

Cover loading, empty, error, unauthorized, offline and stale-data states; tenant switching; session revocation; cross-tenant identifiers; timeout after successful mutation; and repeated submission with a stable idempotency key. Verify UTC/IANA timezone boundaries and integer minor-unit money without floating-point drift.

Use synthetic fixtures only. Include accessibility automation and manual assistive-technology review. Previews and snapshots do not replace behavior or authorization tests. Record evidence in PRs.

## Execution status

No executable project or test commands exist yet. Toolchain versions, runners, device/browser matrix and quality thresholds are TBD in the [decision log](docs/decisions/README.md). Documentation changes require relative-link and consistency checks; future implementation must establish runnable checks before claiming test coverage.
