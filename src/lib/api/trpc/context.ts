import "server-only";

/**
 * Per-request context, callable from both the fetch route handler and
 * Server Components (via next/headers, once session storage is decided).
 * Session/tenant/capability resolution is TBD (see docs/decisions/README.md,
 * WEB-03) — this stub carries the shape that authorization checks will rely on.
 */
export async function createTRPCContext() {
  return {
    session: null as null | {
      userId: string;
      tenantId: string;
      capabilities: readonly string[];
    },
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
