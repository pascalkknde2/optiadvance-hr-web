# Authorization

Backend services enforce capabilities for every resource. The web server also checks authentication, Tenant scope and required capability for each protected read, action and route handler. Client affordances are explanatory only.

Never authorize by persona route name, hidden button or an unverified request Tenant ID. Recheck exports, document downloads and list queries. Test direct URL access, forged requests, revoked grants, cross-tenant IDs and stale cached permissions. Capability names, delegation and identity integration are TBD.

See [architecture](../ARCHITECTURE.md), [security](../SECURITY.md) and the [decision log](decisions/README.md).
