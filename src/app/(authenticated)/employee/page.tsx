import { getServerTrpc } from "@/lib/api/trpc/server";

export default async function EmployeeHomePage() {
  const trpc = await getServerTrpc();
  const health = await trpc.system.health();

  return (
    <main className="flex flex-1 flex-col gap-2 p-8">
      <h1 className="text-xl font-semibold">Employee</h1>
      <p className="text-sm text-neutral-500">
        Server Component calling tRPC directly (no HTTP round trip). API status: {health.status} at{" "}
        {health.timestamp}.
      </p>
    </main>
  );
}
