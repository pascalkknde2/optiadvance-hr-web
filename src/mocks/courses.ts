export type CourseCategory = "Compliance" | "Technical" | "Leadership" | "Soft Skills";
export type CourseFormat = "Online" | "In-person" | "Blended";

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  format: CourseFormat;
  durationHours: number;
  enrolled: number;
  completed: number;
}

const raw: Omit<Course, "id">[] = [
  { title: "GDPR & Data Protection Essentials", category: "Compliance", format: "Online", durationHours: 2, enrolled: 19, completed: 17 },
  { title: "Diversity & Inclusion in the Workplace", category: "Compliance", format: "Online", durationHours: 1.5, enrolled: 19, completed: 15 },
  { title: "Cyber Security Awareness", category: "Compliance", format: "Online", durationHours: 1, enrolled: 19, completed: 19 },
  { title: "First Aid & Fire Safety", category: "Compliance", format: "In-person", durationHours: 3, enrolled: 12, completed: 10 },
  { title: "Advanced TypeScript Patterns", category: "Technical", format: "Online", durationHours: 6, enrolled: 6, completed: 4 },
  { title: "Cloud Infrastructure Fundamentals", category: "Technical", format: "Blended", durationHours: 8, enrolled: 5, completed: 2 },
  { title: "Financial Modelling in Excel", category: "Technical", format: "Online", durationHours: 5, enrolled: 3, completed: 3 },
  { title: "Sales Negotiation Mastery", category: "Technical", format: "In-person", durationHours: 3, enrolled: 3, completed: 2 },
  { title: "Leading High-Performing Teams", category: "Leadership", format: "In-person", durationHours: 4, enrolled: 6, completed: 3 },
  { title: "Recruitment & Interviewing Skills", category: "Leadership", format: "Online", durationHours: 3, enrolled: 4, completed: 4 },
  { title: "Giving Effective Feedback", category: "Soft Skills", format: "Online", durationHours: 2, enrolled: 14, completed: 9 },
  { title: "Time Management & Prioritisation", category: "Soft Skills", format: "Online", durationHours: 1, enrolled: 10, completed: 8 },
];

export const courses: Course[] = raw.map((course, index) => ({
  id: `course-${index + 1}`,
  ...course,
}));

export const courseCategories: CourseCategory[] = ["Compliance", "Technical", "Leadership", "Soft Skills"];
export const courseFormats: CourseFormat[] = ["Online", "In-person", "Blended"];
