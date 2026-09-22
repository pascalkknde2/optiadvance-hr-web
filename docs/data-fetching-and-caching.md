# Data fetching and caching

Fetch initial server-rendered data through server-only adapters. Use TanStack Query for interactive client server state, with documented ownership of initial data, hydration, staleness and invalidation. Avoid duplicate state stores and duplicated initial requests.

Treat employee data as private: choose explicit no-store/private caching where appropriate and isolate any cache by Tenant/session/capability context. Clear query caches on identity changes. Keep stale data visibly labeled and do not show a prior Tenant’s result during a new request. Cache lifetimes and deployment-specific behavior are TBD.

See [architecture](../ARCHITECTURE.md), [security](../SECURITY.md) and the [decision log](decisions/README.md).
