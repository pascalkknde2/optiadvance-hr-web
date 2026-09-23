import { Award, MessageSquare, TrendingUp, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import FeedbackFeed from "@/components/people/feedback-feed";
import { feedbackEntries } from "@/mocks/feedback";

export const metadata: Metadata = {
  title: "Feedback | OptiAdvance HR",
  description: "Continuous peer, manager and upward feedback.",
};

export default function FeedbackPage() {
  const peer = feedbackEntries.filter((entry) => entry.type === "Peer").length;
  const kudos = feedbackEntries.filter((entry) => entry.type === "Kudos").length;
  const contributors = new Set(feedbackEntries.map((entry) => entry.fromId)).size;

  const summary = [
    { label: "Total Feedback", value: feedbackEntries.length, icon: MessageSquare },
    { label: "Peer Feedback", value: peer, icon: TrendingUp },
    { label: "Kudos Given", value: kudos, icon: Award },
    { label: "Contributors", value: contributors, icon: Users },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Performance" text="Feedback" />

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

      <FeedbackFeed />
    </>
  );
}
