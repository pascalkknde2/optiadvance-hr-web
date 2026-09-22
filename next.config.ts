import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disabled: the dev server's agent-file/route auto-generation silently
  // reintroduced the components/auth flow this project explicitly excluded
  // (see docs/decisions/ADR-0004-trpc-for-web-internal-api.md context) and
  // wrote AGENTS.md/CLAUDE.md unprompted. Keep this off.
  agentRules: false,
};

export default nextConfig;
