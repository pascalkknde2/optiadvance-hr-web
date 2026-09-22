# Storybook strategy

Use Storybook for reusable UI and feature presentation states, with MSW supplying synthetic contract-shaped responses. Include loading, empty, error, unauthorized, offline and stale-data stories plus success.

Keep server-only dependencies out of stories and inject presentation-ready props where necessary. Cover Tailwind token mappings, themes, long content, keyboard behavior and reduced motion. Pair stable stories with appropriate visual review; tool/addon choices are TBD. Storybook does not replace Playwright server/session authorization tests.

See [architecture](../ARCHITECTURE.md), [security](../SECURITY.md) and the [decision log](decisions/README.md).
