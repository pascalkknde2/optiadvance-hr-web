# Route map

The blueprint separates public, authenticated, employee, manager, hr-admin and payroll-admin entry areas. Features include authentication, dashboard, attendance, leave, approvals, payroll, people, notifications, expenses and tasks.

These directories illustrate ownership, not implemented URLs or finalized App Router route groups. Actual segment names/layouts are TBD. Route/layout visibility does not grant permission: every protected read, mutation and backend call must enforce Tenant and capability checks. Deep links must handle missing, unauthorized and stale resources safely.

See [architecture](../ARCHITECTURE.md), [security](../SECURITY.md) and the [decision log](decisions/README.md).
