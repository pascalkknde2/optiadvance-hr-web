import { employees } from "@/mocks/employees";
import { orgChart } from "@/mocks/org-chart";

export type ReviewStage = "Not Started" | "Self-Assessment" | "Manager Review" | "Completed";
export type ReviewRating = "Exceeds Expectations" | "Meets Expectations" | "Development Needed";

export interface Review {
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  reviewer: string;
  cycle: string;
  stage: ReviewStage;
  rating: ReviewRating | null;
  dueDate: string;
}

// Reviewer is derived from the org chart's reporting lines, so this page
// never disagrees with the Organisation page.
const reviewerByEmployeeName = new Map<string, string>();
orgChart.forEach((lead) => {
  reviewerByEmployeeName.set(lead.employeeName, "Executive Team");
  lead.reports.forEach((report) => reviewerByEmployeeName.set(report.employeeName, lead.employeeName));
});

const stageAndRatingByEmployeeId: Record<string, { stage: ReviewStage; rating: ReviewRating | null }> = {
  "1": { stage: "Completed", rating: "Exceeds Expectations" },
  "2": { stage: "Completed", rating: "Exceeds Expectations" },
  "3": { stage: "Completed", rating: "Exceeds Expectations" },
  "4": { stage: "Manager Review", rating: null },
  "5": { stage: "Completed", rating: "Meets Expectations" },
  "6": { stage: "Not Started", rating: null },
  "7": { stage: "Self-Assessment", rating: null },
  "8": { stage: "Completed", rating: "Exceeds Expectations" },
  "9": { stage: "Completed", rating: "Exceeds Expectations" },
  "10": { stage: "Self-Assessment", rating: null },
  "11": { stage: "Completed", rating: "Meets Expectations" },
  "13": { stage: "Manager Review", rating: null },
  "14": { stage: "Completed", rating: "Meets Expectations" },
  "15": { stage: "Completed", rating: "Meets Expectations" },
  "16": { stage: "Manager Review", rating: null },
  "17": { stage: "Self-Assessment", rating: null },
  "18": { stage: "Completed", rating: "Meets Expectations" },
  "19": { stage: "Not Started", rating: null },
  "20": { stage: "Completed", rating: "Meets Expectations" },
};

export const reviewCycle = "Q3 2026";

export const reviews: Review[] = employees
  .filter((employee) => employee.status !== "Inactive")
  .map((employee) => {
    const { stage, rating } = stageAndRatingByEmployeeId[employee.id] ?? { stage: "Not Started" as ReviewStage, rating: null };

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      avatar: employee.avatar,
      department: employee.department,
      reviewer: reviewerByEmployeeName.get(employee.name) ?? "Executive Team",
      cycle: reviewCycle,
      stage,
      rating,
      dueDate: "30 Sep 2026",
    };
  });

export const reviewStages: ReviewStage[] = ["Not Started", "Self-Assessment", "Manager Review", "Completed"];
