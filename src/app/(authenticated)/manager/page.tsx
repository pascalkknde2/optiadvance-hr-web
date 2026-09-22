"use client";

import { api } from "@/lib/api/trpc/react";

export default function ManagerHomePage() {
  const health = api.system.health.useQuery();

  return (
    <main className="flex flex-1 flex-col gap-2 p-8">
      <h1 className="text-xl font-semibold">Manager</h1>
      <p className="text-sm text-neutral-500">
        Client Component via TanStack Query. API status:{" "}
        {health.isPending ? "loading..." : `${health.data?.status} at ${health.data?.timestamp}`}
      </p>
    </main>
  );
}
