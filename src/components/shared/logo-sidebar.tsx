"use client";

import Link from "next/link";

import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { cn } from "@/lib/utils";

function LogoSidebar() {
  const isCollapsed = useSidebarCollapsed();

  return (
    <Link
      href="/home"
      className={cn(
        "sidebar-logo h-[72px] py-3.5 flex items-center justify-center border-b border-neutral-100 dark:border-slate-700",
        isCollapsed ? "px-1" : "px-4"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, next/image's optimizer rejects local SVGs without extra config */}
      <img
        src={isCollapsed ? "/logo/refined-logo.svg" : "/logo/optiadvance-logo-refined.svg"}
        alt="OptiAdvance"
        width={isCollapsed ? 40 : 168}
        height={40}
      />
    </Link>
  );
}

export default LogoSidebar;
