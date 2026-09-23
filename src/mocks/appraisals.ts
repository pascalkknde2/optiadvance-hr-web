import { employees } from "@/mocks/employees";
import { reviews, type ReviewRating } from "@/mocks/reviews";

export type CalibrationStatus = "Pending Calibration" | "Signed Off";

export interface Appraisal {
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  rating: ReviewRating;
  score: number;
  recommendedIncrease: number;
  promotionRecommended: boolean;
  calibrationStatus: CalibrationStatus;
}

interface AppraisalOverride {
  score: number;
  recommendedIncrease: number;
  promotionRecommended: boolean;
  calibrationStatus: CalibrationStatus;
}

// Appraisals only exist for reviews that have reached "Completed" — the
// calibration step follows the review, it doesn't happen independently.
const overridesByEmployeeId: Record<string, AppraisalOverride> = {
  "1": { score: 4.7, recommendedIncrease: 6, promotionRecommended: false, calibrationStatus: "Signed Off" },
  "2": { score: 4.8, recommendedIncrease: 5, promotionRecommended: false, calibrationStatus: "Signed Off" },
  "3": { score: 4.9, recommendedIncrease: 5, promotionRecommended: false, calibrationStatus: "Signed Off" },
  "5": { score: 3.6, recommendedIncrease: 3, promotionRecommended: false, calibrationStatus: "Signed Off" },
  "8": { score: 4.6, recommendedIncrease: 6, promotionRecommended: true, calibrationStatus: "Pending Calibration" },
  "9": { score: 4.7, recommendedIncrease: 5, promotionRecommended: false, calibrationStatus: "Signed Off" },
  "11": { score: 3.4, recommendedIncrease: 2, promotionRecommended: false, calibrationStatus: "Signed Off" },
  "14": { score: 3.5, recommendedIncrease: 3, promotionRecommended: false, calibrationStatus: "Signed Off" },
  "15": { score: 3.3, recommendedIncrease: 2, promotionRecommended: false, calibrationStatus: "Pending Calibration" },
  "18": { score: 3.7, recommendedIncrease: 3, promotionRecommended: true, calibrationStatus: "Signed Off" },
  "20": { score: 3.5, recommendedIncrease: 3, promotionRecommended: false, calibrationStatus: "Signed Off" },
};

export const appraisalCycle = reviews[0]?.cycle ?? "";

export const appraisals: Appraisal[] = reviews
  .filter((review) => review.stage === "Completed" && review.rating)
  .map((review) => {
    const override = overridesByEmployeeId[review.employeeId];
    return {
      employeeId: review.employeeId,
      employeeName: review.employeeName,
      avatar: review.avatar,
      department: review.department,
      rating: review.rating as ReviewRating,
      score: override?.score ?? 3.5,
      recommendedIncrease: override?.recommendedIncrease ?? 2,
      promotionRecommended: override?.promotionRecommended ?? false,
      calibrationStatus: override?.calibrationStatus ?? "Pending Calibration",
    };
  });
