import { Heart, Lightbulb, Smile, Users } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import {
  enpsScore,
  openSuggestions,
  pulseCategories,
  pulseParticipation,
  pulseSurveyPeriod,
  recognitionPosts,
} from "@/mocks/engagement";

export const metadata: Metadata = {
  title: "Engagement | OptiAdvance HR",
  description: "eNPS, pulse survey results and employee recognition.",
};

export default function EngagementPage() {
  const summary = [
    { label: "eNPS Score", value: `+${enpsScore}`, icon: Smile },
    { label: "Pulse Participation", value: `${pulseParticipation}%`, icon: Users },
    { label: "Recognitions (30d)", value: recognitionPosts.length, icon: Heart },
    { label: "Open Suggestions", value: openSuggestions, icon: Lightbulb },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Engagement" text="Overview" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {summary.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-300">{label}</p>
              <h5 className="font-semibold mb-0">{value}</h5>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pulse survey breakdown */}
        <div className="card">
          <h6 className="font-semibold mb-1">Pulse Survey Results</h6>
          <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-5">{pulseSurveyPeriod} · average score out of 5</p>

          <div className="space-y-4">
            {pulseCategories.map((category) => (
              <div key={category.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span>{category.label}</span>
                  <span className="font-medium">{category.score.toFixed(1)} / 5</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(category.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition feed */}
        <div className="card">
          <h6 className="font-semibold mb-1">Recent Recognition</h6>
          <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-5">Kudos shared across the company</p>

          <div className="space-y-4">
            {recognitionPosts.map((post) => (
              <div key={post.id} className="flex gap-3 border-b border-neutral-200 dark:border-slate-600 pb-4 last:border-0 last:pb-0">
                <div className="flex -space-x-2 shrink-0">
                  <Image src={post.fromAvatar} alt={post.from} className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                  <Image src={post.toAvatar} alt={post.to} className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{post.from}</span>{" "}
                    <span className="text-neutral-500 dark:text-neutral-300">recognised</span>{" "}
                    <span className="font-medium">{post.to}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-300">{post.message}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                    <span>{post.date}</span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
