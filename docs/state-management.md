# State management

Use URL search parameters for shareable filtering, sorting and pagination; never include secrets or sensitive employee filters in URLs. TanStack Query owns interactive server state and TanStack Table provides table behavior using the same explicit query state.

Do not copy TanStack Query data into redundant component state. Use local state for transient interaction and React Hook Form for deliberate editable drafts. Scope query keys by Tenant/session and reset them on logout or tenant change. Invalidate or reconcile after mutations; do not blindly retry non-idempotent operations.

See [architecture](../ARCHITECTURE.md), [security](../SECURITY.md) and the [decision log](decisions/README.md).
