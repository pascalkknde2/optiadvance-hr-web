# Storybook

Storybook is planned as the web component review environment, using MSW for synthetic contract-shaped responses. It is not initialized and has no start/build command yet. See [the strategy](docs/storybook-strategy.md).

Stories should cover relevant loading, empty, success, error, unauthorized, offline and stale-data states, plus keyboard focus, long content, themes and reduced motion. Keep server-only imports, tokens and employee records out of stories and static builds.

Review interaction with React Testing Library and critical server-integrated journeys with Playwright. Versions, addons, visual review tooling and publishing permissions are TBD in the [decision log](docs/decisions/README.md); Storybook output is not automatically approved for public hosting.
