# Release process

No releases exist and this bootstrap does not authorize publication. Release owners, support windows and distribution details are TBD in the [decision log](decisions/README.md).

1. Select a reviewed candidate and complete [testing](../TESTING.md), accessibility and [security](../SECURITY.md) checks.
2. Confirm hosting/runtime, proposed DNS, session/cookie configuration, private cache behavior, deployment rollback and browser support. Keep server credentials out of client bundles.
3. Update the Unreleased [changelog](../CHANGELOG.md) and [compatibility matrix](../../optiadvance-hr-platform/docs/operations/release-management.md) with client, contract and token revisions.
4. Verify compatible backend behavior is available before rollout and confirm private support and incident channels.
5. Record explicit approval, rollout observations and a rollback plan that preserves contract and data compatibility.

Use the [platform release checklist](../../optiadvance-hr-platform/templates/release-checklist.md). Versions and release dates are assigned only when real releases are prepared; no fictional release entries should be added now.
