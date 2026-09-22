# Security policy

## Supported versions

TBD: no releases exist. Before the first release, owners must publish supported versions, patch windows and end-of-support dates in the decision log and release compatibility matrix.

## Private vulnerability reporting

Private reporting address, secure intake channel and acknowledgment targets are TBD. Do not post exploit details, credentials or sensitive attachments publicly. Until a private channel is approved, ask a repository maintainer to arrange a private route without sharing the vulnerability in a public issue. No address on `optiadvance.com` is assumed to exist.

## Authentication and authorization

Prefer Secure HttpOnly cookie-based web sessions where supported; choose SameSite and CSRF defenses for the final authentication flow. Never store authentication tokens in localStorage or expose them to client bundles. Clear tenant-scoped caches and queued operations on logout or tenant change. Backend services must verify tenant membership, resource ownership and required capabilities for every protected operation, including downloads and exports.

## Personal-data handling

Minimize employee, attendance, payroll, medical, document and location data. Use synthetic fixtures; restrict local persistence and exports to documented needs. Retention, geographic processing and deletion policy are TBD and require review before production. Never submit real employee data in bug reports.

## Logging and analytics

Never log tokens, session cookies, request bodies containing personal data, document contents, precise location or payroll amounts. Use approved event schemas, redaction and non-sensitive correlation IDs. Audit trails belong in protected backend storage, not client analytics.

## Dependencies and secrets

Require dependency review, vulnerability scanning and secret scanning before executable projects are introduced and on future PRs. Scanner selection and exception owners are TBD. Treat discovered credentials as compromised and rotate them through the eventual incident process.

## Incident escalation

On-call owner, private channel and response targets are TBD. Restrict exposure, preserve redacted evidence, notify the designated security owner privately and coordinate revocation and recovery. Follow the [platform incident plan](../optiadvance-hr-platform/docs/security/incident-response.md); do not invent reporting deadlines.
