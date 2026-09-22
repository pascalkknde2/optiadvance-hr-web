# Changelog

All notable changes will be documented here using Keep a Changelog sections. Release numbering and cadence are TBD; no released versions exist.

## [Unreleased]

### Added

- Initial OptiAdvance HR repository documentation, proposed architecture decisions and contribution and security policies.
- Initialized the Next.js 16.3.5 / React 19.3.0 App Router project (TypeScript strict mode, Tailwind CSS v4, npm) with the `src/{app,features,components,design-system,lib,mocks,tests}` boundaries from the former structure blueprint materialized as real directories.
- Added tRPC (`@trpc/server`, `@trpc/client`, `@trpc/react-query`) over TanStack Query as the web app's internal API layer, with a route handler at `/api/trpc/[trpc]` and a demo `system.health` procedure exercised from both a Server Component and a Client Component ([ADR-0004](docs/decisions/ADR-0004-trpc-for-web-internal-api.md)).
