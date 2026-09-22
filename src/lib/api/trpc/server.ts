import "server-only";
import { createTRPCContext } from "./context";
import { createCaller } from "./router";

/**
 * Direct in-process router call for Server Components — no HTTP round trip.
 * Prefer this over the fetch route handler when loading initial data server-side.
 */
export async function getServerTrpc() {
  const ctx = await createTRPCContext();
  return createCaller(ctx);
}
