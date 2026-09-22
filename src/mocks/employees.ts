import type { StaticImageData } from "next/image";

import UserList1 from "@/public/assets/images/user-list/user-list1.png";
import UserList10 from "@/public/assets/images/user-list/user-list10.png";
import UserList2 from "@/public/assets/images/user-list/user-list2.png";
import UserList3 from "@/public/assets/images/user-list/user-list3.png";
import UserList4 from "@/public/assets/images/user-list/user-list4.png";
import UserList5 from "@/public/assets/images/user-list/user-list5.png";
import UserList6 from "@/public/assets/images/user-list/user-list6.png";
import UserList7 from "@/public/assets/images/user-list/user-list7.png";
import UserList8 from "@/public/assets/images/user-list/user-list8.png";
import UserList9 from "@/public/assets/images/user-list/user-list9.png";

const avatars: StaticImageData[] = [
  UserList1,
  UserList2,
  UserList3,
  UserList4,
  UserList5,
  UserList6,
  UserList7,
  UserList8,
  UserList9,
  UserList10,
];

export type EmploymentType = "Permanent" | "Fixed Term" | "Contractor";
export type EmployeeStatus = "Active" | "On Leave" | "Inactive";

export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  avatar: StaticImageData;
  department: string;
  position: string;
  employmentType: EmploymentType;
  location: string;
  status: EmployeeStatus;
  joinDate: string;
}

const raw: Omit<Employee, "avatar" | "employeeCode" | "email">[] = [
  { id: "1", name: "Amara Okafor", department: "Engineering", position: "Senior Software Engineer", employmentType: "Permanent", location: "London", status: "Active", joinDate: "12 Mar 2022" },
  { id: "2", name: "Daniel Osei", department: "Engineering", position: "Engineering Manager", employmentType: "Permanent", location: "London", status: "Active", joinDate: "03 Jun 2020" },
  { id: "3", name: "Sophie Carter", department: "People & Talent", position: "Head of People", employmentType: "Permanent", location: "London", status: "Active", joinDate: "14 Jan 2016" },
  { id: "4", name: "Liam Fitzgerald", department: "Sales", position: "Account Executive", employmentType: "Permanent", location: "Manchester", status: "Active", joinDate: "21 Sep 2023" },
  { id: "5", name: "Priya Nair", department: "Customer Support", position: "Support Team Lead", employmentType: "Permanent", location: "Remote", status: "Active", joinDate: "09 Nov 2021" },
  { id: "6", name: "Tomasz Wojcik", department: "Finance", position: "Financial Analyst", employmentType: "Permanent", location: "London", status: "On Leave", joinDate: "17 Feb 2022" },
  { id: "7", name: "Grace Adeyemi", department: "Operations", position: "Operations Manager", employmentType: "Permanent", location: "Birmingham", status: "Active", joinDate: "02 Apr 2019" },
  { id: "8", name: "Chen Wei", department: "Engineering", position: "Platform Engineer", employmentType: "Contractor", location: "Remote", status: "Active", joinDate: "05 May 2024" },
  { id: "9", name: "Meera Patel", department: "Finance", position: "Payroll Specialist", employmentType: "Permanent", location: "London", status: "Active", joinDate: "28 Aug 2020" },
  { id: "10", name: "Jack Sullivan", department: "Sales", position: "Sales Development Rep", employmentType: "Fixed Term", location: "Manchester", status: "Active", joinDate: "11 Jul 2024" },
  { id: "11", name: "Olivia Bennett", department: "Engineering", position: "Frontend Engineer", employmentType: "Permanent", location: "London", status: "Active", joinDate: "19 Oct 2022" },
  { id: "12", name: "Ahmed Hassan", department: "Operations", position: "Facilities Coordinator", employmentType: "Permanent", location: "Birmingham", status: "Inactive", joinDate: "06 Dec 2018" },
  { id: "13", name: "Isabella Rossi", department: "Customer Support", position: "Support Specialist", employmentType: "Permanent", location: "Remote", status: "Active", joinDate: "23 Jan 2023" },
  { id: "14", name: "Noah Williams", department: "Engineering", position: "QA Engineer", employmentType: "Permanent", location: "London", status: "Active", joinDate: "15 Mar 2021" },
  { id: "15", name: "Freya Johansson", department: "People & Talent", position: "Talent Acquisition Partner", employmentType: "Permanent", location: "London", status: "Active", joinDate: "30 Jun 2023" },
  { id: "16", name: "Marcus Reid", department: "Sales", position: "Regional Sales Manager", employmentType: "Permanent", location: "Manchester", status: "On Leave", joinDate: "08 Feb 2019" },
  { id: "17", name: "Yuki Tanaka", department: "Engineering", position: "Backend Engineer", employmentType: "Permanent", location: "Remote", status: "Active", joinDate: "27 Sep 2022" },
  { id: "18", name: "Ella Thompson", department: "Finance", position: "Finance Business Partner", employmentType: "Permanent", location: "London", status: "Active", joinDate: "04 Nov 2020" },
  { id: "19", name: "Kwame Mensah", department: "Operations", position: "Supply Chain Analyst", employmentType: "Contractor", location: "Birmingham", status: "Active", joinDate: "16 Apr 2024" },
  { id: "20", name: "Charlotte Dubois", department: "Customer Support", position: "Customer Success Manager", employmentType: "Permanent", location: "Remote", status: "Active", joinDate: "12 Dec 2021" },
];

export const employees: Employee[] = raw.map((employee, index) => ({
  ...employee,
  avatar: avatars[index % avatars.length],
  employeeCode: `EMP-${String(1000 + index).padStart(5, "0")}`,
  email: `${employee.name.toLowerCase().replace(/[^a-z ]/g, "").replace(/\s+/g, ".")}@optiadvance.com`,
}));

export const departments = Array.from(new Set(employees.map((employee) => employee.department))).sort();
