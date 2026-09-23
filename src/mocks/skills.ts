export type SkillCategory = "Technical" | "Leadership" | "Domain" | "Soft Skills";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  peopleCount: number;
  avgProficiency: number; // 1-5
}

const TOTAL_EMPLOYEES = 19;

const raw: Omit<Skill, "id">[] = [
  { name: "TypeScript", category: "Technical", peopleCount: 6, avgProficiency: 3.8 },
  { name: "React", category: "Technical", peopleCount: 5, avgProficiency: 3.6 },
  { name: "Node.js / Backend APIs", category: "Technical", peopleCount: 5, avgProficiency: 3.7 },
  { name: "Cloud Infrastructure (AWS)", category: "Technical", peopleCount: 3, avgProficiency: 3.0 },
  { name: "SQL & Data Analysis", category: "Technical", peopleCount: 6, avgProficiency: 3.4 },
  { name: "CI/CD & DevOps", category: "Technical", peopleCount: 4, avgProficiency: 3.2 },
  { name: "People Management", category: "Leadership", peopleCount: 6, avgProficiency: 4.0 },
  { name: "Stakeholder Management", category: "Leadership", peopleCount: 8, avgProficiency: 3.6 },
  { name: "Coaching & Mentoring", category: "Leadership", peopleCount: 5, avgProficiency: 3.5 },
  { name: "Payroll & Compliance", category: "Domain", peopleCount: 3, avgProficiency: 4.1 },
  { name: "Recruitment & Interviewing", category: "Domain", peopleCount: 4, avgProficiency: 3.8 },
  { name: "Financial Modelling", category: "Domain", peopleCount: 3, avgProficiency: 3.6 },
  { name: "Customer Success", category: "Domain", peopleCount: 3, avgProficiency: 3.9 },
  { name: "Negotiation", category: "Soft Skills", peopleCount: 5, avgProficiency: 3.4 },
  { name: "Communication", category: "Soft Skills", peopleCount: 15, avgProficiency: 4.0 },
];

export const skills: Skill[] = raw.map((skill, index) => ({ id: `skill-${index + 1}`, ...skill }));

export const skillCategories: SkillCategory[] = ["Technical", "Leadership", "Domain", "Soft Skills"];

export const skillsTotalEmployees = TOTAL_EMPLOYEES;
