# Server and client boundaries

React Server Components are the default. Use server-only adapters for sensitive initial data and session checks. Client Components are justified by interactivity or browser APIs and receive only minimal serializable props.

Do not import server-only credentials or modules into browser bundles. Authorize each server action/handler and backend operation independently; a protected layout is insufficient. Document per-feature data ownership, cache scope and hydration to avoid duplicate fetching and accidental personal-data serialization.

See [architecture](../ARCHITECTURE.md), [security](../SECURITY.md) and the [decision log](decisions/README.md).
