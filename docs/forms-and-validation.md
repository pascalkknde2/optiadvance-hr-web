# Forms and validation

Use React Hook Form with Zod for typed client validation and accessible field errors. Backend services remain authoritative for business rules, tenant scope and capabilities; server-side input handling must validate too.

Map stable contract field errors to controls, preserve safe drafts on failure and announce submission status. Support keyboard navigation, disabled/pending states and a clear recovery action. Attendance, leave, approval and expense submissions reuse the logical intent’s idempotency key on ambiguous retries. Currency and date validation follow shared contract conventions.

See [architecture](../ARCHITECTURE.md), [security](../SECURITY.md) and the [decision log](decisions/README.md).
