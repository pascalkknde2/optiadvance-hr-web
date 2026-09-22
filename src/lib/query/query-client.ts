import { QueryClient, defaultShouldDehydrateQuery } from "@tanstack/react-query";

/**
 * One QueryClient per request on the server, one per browser tab on the client.
 * Cache lifetimes are TBD (see docs/data-fetching-and-caching.md) — defaults
 * here are conservative placeholders, not an approved policy.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}
