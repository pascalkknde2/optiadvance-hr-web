# Outstanding HR Dashboard --- Complete Product Screen & Module Blueprint

This document consolidates the complete proposed HR Dashboard / HRIS
design, expanding the original 32 screens into a modern **HRIS +
Payroll + Recruitment + Performance + Employee Self-Service** platform.

## Original Screens

1.  Dashboard
2.  Employees
3.  Holidays
4.  Leaves
5.  Leaves Settings
6.  Employees Salary
7.  Payslip
8.  Payroll Items
9.  Payroll Items (Overtime)
10. Payroll Items (Deductions)
11. Expense Report
12. Invoice Report
13. Payment Report
14. User Report
15. Employee Report
16. Performance Indicator
17. Performance Review
18. Performance Appraisal
19. Termination
20. Job Dashboard
21. Create Notice
22. Job Applicants
23. Job Positions
24. Job Settings
25. Activities
26. Company Settings
27. Company Settings (Option Menu)
28. Theme Settings
29. Email Settings
30. Salary Settings
31. Change Password
32. Leave Settings
33. Leave Settings (Popup)

------------------------------------------------------------------------

## 1. Dashboard & Workspace

1.  **HR Dashboard** --- Workforce KPIs, headcount, attendance, leave,
    payroll, hiring
2.  **My Dashboard** --- Personalized employee/manager workspace
3.  **Executive Dashboard** --- Workforce cost, turnover, hiring,
    absence and workforce trends
4.  **HR Analytics Dashboard** --- Advanced workforce analytics
5.  **Tasks & Approvals** --- Pending HR actions
6.  **Notifications Centre** --- System and HR notifications
7.  **HR Calendar** --- Leave, holidays, birthdays, reviews and
    interviews
8.  **Activities / Audit Feed** --- Recent HR activities

The main dashboard should immediately answer:

-   How many people work here?
-   Who is absent?
-   Who is joining or leaving?
-   What requires approval?
-   What is payroll costing?
-   What hiring activity is underway?

Recommended KPI cards:

-   Total Employees
-   Active Employees
-   New Hires
-   Employees on Leave
-   Open Positions
-   Pending Approvals
-   Monthly Payroll
-   Turnover Rate

Recommended dashboard widgets:

-   Workforce trend charts
-   Department distribution
-   Attendance overview
-   Leave overview
-   Recruitment funnel
-   Upcoming birthdays
-   Work anniversaries
-   Approval queue
-   Payroll summary

------------------------------------------------------------------------

## 2. Employee Management

9.  Employees Directory
10. Employee Grid
11. Add Employee
12. Employee Profile
13. Personal Information
14. Employment Information
15. Contact & Emergency Contacts
16. Job & Position Information
17. Compensation
18. Benefits
19. Bank / Payment Details
20. Tax Information
21. Employee Documents
22. Qualifications
23. Skills & Certifications
24. Employment History
25. Dependants
26. Assets Assigned
27. Employee Notes
28. Employee Timeline
29. Employee Organisation Chart
30. Employee Status History

### Employee 360° Profile

The employee profile should act as the central HR workspace for one
employee.

``` text
┌─────────────────────────────────────────────────────────────┐
│ 👤 Pascal Kankonde                         ACTIVE           │
│ Senior Software Engineer                                    │
│ Engineering • London • EMP-00124                            │
├─────────────────────────────────────────────────────────────┤
│ Overview │ Job │ Payroll │ Leave │ Performance │ Documents  │
│ Attendance │ Benefits │ Assets │ Training │ Timeline        │
├─────────────────────────────────────────────────────────────┤
│ Manager              Employment       Current Salary        │
│ Jane Smith           Permanent        £XX,XXX               │
│                                                             │
│ Start Date           Leave Balance    Next Review           │
│ 12 Mar 2024          18 days          15 Dec 2026           │
└─────────────────────────────────────────────────────────────┘
```

This prevents HR administrators from navigating many unrelated screens
to understand one employee.

------------------------------------------------------------------------

## 3. Organisation Management

31. Organisation Chart
32. Companies / Legal Entities
33. Business Units
34. Departments
35. Teams
36. Locations
37. Offices
38. Job Titles
39. Job Grades
40. Positions
41. Cost Centres
42. Reporting Lines

The **Organisation Chart** should be interactive, supporting:

-   CEO → Directors → Managers → Employees
-   Search
-   Zoom
-   Department filtering
-   Employee cards
-   Reporting-line navigation

------------------------------------------------------------------------

## 4. Attendance & Time Management

43. Attendance Dashboard
44. Daily Attendance
45. My Attendance
46. Team Attendance
47. Clock In / Clock Out
48. Timesheets
49. My Timesheet
50. Timesheet Approval
51. Work Schedules
52. Shift Management
53. Shift Planner
54. Overtime Requests
55. Overtime Approvals
56. Late / Early Departure
57. Attendance Exceptions
58. Attendance Settings

Potential integrations:

-   Mobile clock-in
-   NFC employee cards
-   QR attendance
-   Biometric terminals

------------------------------------------------------------------------

## 5. Leave & Holiday Management

59. Leave Dashboard
60. My Leave
61. Request Leave
62. Team Leave
63. Leave Requests
64. Leave Approval
65. Leave Calendar
66. Leave Balances
67. Leave Types
68. Leave Policies
69. Leave Accrual Rules
70. Carry-Over Rules
71. Public Holidays
72. Holiday Calendars
73. Leave Settings
74. Leave Settings Modal
75. Leave Reports

The calendar view is especially important so managers can identify
staffing conflicts before approving leave.

------------------------------------------------------------------------

## 6. Payroll

76. Payroll Dashboard
77. Payroll Runs
78. Run Payroll
79. Payroll Processing
80. Payroll Approval
81. Employee Salary
82. Salary History
83. Payslips
84. My Payslips
85. Payroll Items
86. Earnings
87. Allowances
88. Bonuses
89. Commissions
90. Overtime
91. Deductions
92. Benefits
93. Taxes
94. Pension / Retirement Contributions
95. Employer Contributions
96. Loans / Salary Advances
97. Payroll Adjustments
98. Payroll Calendar
99. Payroll Settings
100. Salary Settings

For UK deployments, payroll architecture should be designed to support
PAYE, National Insurance, pension contributions, statutory payments and
HMRC-related workflows where applicable.

------------------------------------------------------------------------

## 7. Expenses

101. Expense Dashboard
102. My Expenses
103. Submit Expense
104. Expense Claims
105. Expense Approval
106. Expense Categories
107. Expense Policies
108. Mileage Claims
109. Receipts
110. Reimbursements
111. Expense Report

Potential enhancement: receipt OCR to extract merchant, date, amount and
VAT information from photographed or uploaded receipts.

------------------------------------------------------------------------

## 8. Recruitment / ATS

112. Recruitment Dashboard
113. Job Requisitions
114. Job Positions
115. Create Job
116. Job Details
117. Careers Portal
118. Candidates
119. Candidate Profile
120. Job Applicants
121. Applicant Pipeline
122. CV / Resume Viewer
123. Candidate Screening
124. Interview Scheduling
125. Interview Calendar
126. Interview Scorecards
127. Candidate Evaluation
128. Offers
129. Create Offer
130. Offer Approval
131. Talent Pool
132. Recruitment Sources
133. Recruitment Analytics
134. Job Settings

### Applicant Pipeline

``` text
Applied
   ↓
Screening
   ↓
Shortlisted
   ↓
Interview
   ↓
Technical Assessment
   ↓
Final Interview
   ↓
Offer
   ↓
Hired
```

Support drag-and-drop candidate movement between stages.

------------------------------------------------------------------------

## 9. Onboarding

135. Onboarding Dashboard
136. New Hires
137. Onboarding Checklist
138. Onboarding Templates
139. Employee Documents
140. Document Verification
141. Contract Signing
142. Equipment Assignment
143. Account Provisioning
144. Training Assignment
145. Probation Management
146. Probation Review

Example automated onboarding workflow:

**Identity Verification → Employment Contract → Payroll Information →
Laptop → Email Account → Security Training → Manager Introduction →
Probation Review**

------------------------------------------------------------------------

## 10. Performance Management

147. Performance Dashboard
148. Goals
149. My Goals
150. Team Goals
151. OKRs
152. KPIs / Performance Indicators
153. Performance Reviews
154. Review Cycles
155. Performance Appraisals
156. Self Assessment
157. Manager Assessment
158. Peer Review
159. 360° Feedback
160. Continuous Feedback
161. One-to-One Meetings
162. Performance Improvement Plans
163. Performance History
164. Performance Analytics

A review can combine:

-   Goals
-   KPIs
-   Competencies
-   Employee Self Review
-   Manager Review
-   Peer Feedback
-   Development Plan

------------------------------------------------------------------------

## 11. Learning & Development

165. Learning Dashboard
166. Course Catalogue
167. My Learning
168. Training Programs
169. Training Sessions
170. Training Calendar
171. Certifications
172. Skills Matrix
173. Employee Skills
174. Development Plans
175. Mandatory Training
176. Training Reports

A **Skills Matrix** is particularly useful for workforce and succession
planning.

------------------------------------------------------------------------

## 12. Employee Engagement

177. Engagement Dashboard
178. Employee Surveys
179. Pulse Surveys
180. Survey Builder
181. Survey Results
182. Employee Recognition
183. Rewards
184. Suggestions
185. Anonymous Feedback
186. Employee Wellbeing

------------------------------------------------------------------------

## 13. HR Helpdesk

187. HR Helpdesk Dashboard
188. My Requests
189. Create HR Request
190. HR Tickets
191. Ticket Details
192. Categories
193. Knowledge Base
194. FAQ
195. SLA Management

Common request categories:

-   Payroll questions
-   Leave problems
-   Contract requests
-   Employment letters
-   Benefits questions

------------------------------------------------------------------------

## 14. Documents & HR Letters

196. Document Centre
197. Employee Documents
198. Document Templates
199. Generate Document
200. Employment Contracts
201. HR Letters
202. Policies
203. Employee Handbook
204. E-Signatures
205. Document Expiry
206. Document Verification

Templates could generate:

-   Employment contracts
-   Salary letters
-   Promotion letters
-   Reference letters
-   Warning letters
-   Termination documents

------------------------------------------------------------------------

## 15. Benefits

207. Benefits Dashboard
208. Benefit Plans
209. Employee Benefits
210. Benefits Enrollment
211. Pension
212. Insurance
213. Allowances
214. Benefit Providers
215. Benefits Reports

------------------------------------------------------------------------

## 16. Employee Lifecycle

216. Promotions
217. Transfers
218. Salary Changes
219. Contract Changes
220. Probation
221. Disciplinary Cases
222. Grievances
223. Warnings
224. Resignations
225. Terminations
226. Exit Interviews
227. Offboarding
228. Offboarding Checklist
229. Final Settlement
230. Alumni / Former Employees

Offboarding should coordinate:

-   Account deactivation
-   Asset return
-   Final payroll
-   Document generation
-   Exit interview

------------------------------------------------------------------------

## 17. Assets

231. Asset Dashboard
232. Assets
233. Asset Categories
234. Assign Asset
235. Employee Assets
236. Asset Returns
237. Asset History
238. Lost / Damaged Assets

Example assets:

-   Laptops
-   Phones
-   ID cards
-   NFC cards
-   Keys
-   Vehicles
-   Security tokens

------------------------------------------------------------------------

## 18. Reports & Analytics

Create a central **Report Centre** covering:

-   Employee Report
-   Headcount Report
-   Turnover Report
-   New Hires Report
-   Termination Report
-   Attendance Report
-   Absence Report
-   Leave Report
-   Payroll Report
-   Salary Report
-   Overtime Report
-   Expense Report
-   Recruitment Report
-   Time-to-Hire Report
-   Performance Report
-   Training Report
-   Invoice Report
-   Payment Report
-   User Activity Report

### Custom Report Builder

``` text
Data Source
    ↓
Employees / Payroll / Leave / Recruitment
    ↓
Choose Fields
    ↓
Filters
    ↓
Group / Sort
    ↓
Charts
    ↓
Preview
    ↓
Export
```

Export formats:

-   PDF
-   Excel
-   CSV

Potential enhancement: scheduled and automatically distributed reports.

------------------------------------------------------------------------

## 19. Approvals & Workflow

Recommended workflow screens:

-   Approval Inbox
-   Leave Approvals
-   Expense Approvals
-   Overtime Approvals
-   Salary Change Approval
-   Recruitment Approval
-   Offer Approval
-   Termination Approval
-   Workflow Designer
-   Workflow History

Example flows:

-   Leave: Manager → HR
-   Expense: Manager → Finance
-   Salary Change: Manager → HR → Finance
-   Recruitment: Manager → HR
-   Offer: HR → Director
-   Termination: Manager → HR → Legal

All approval actions should retain a complete audit trail.

------------------------------------------------------------------------

## 20. Announcements & Communication

Expand **Create Notice** into:

-   Announcements
-   Create Announcement
-   Notices
-   Events
-   Company Calendar
-   Employee Birthdays
-   Work Anniversaries
-   Emergency Notices
-   Notification Templates

Audience targeting:

``` text
Everyone
UK Employees
Engineering
London Office
Managers
Specific Employees
```

------------------------------------------------------------------------

## 21. Employee Self-Service Portal

``` text
My Profile
My Attendance
My Timesheets
My Leave
My Payslips
My Expenses
My Benefits
My Documents
My Goals
My Reviews
My Training
My Assets
My Requests
Company Directory
Organisation Chart
Announcements
```

Employee self-service should reduce routine HR administration.

------------------------------------------------------------------------

## 22. Manager Self-Service

``` text
My Team
Team Attendance
Team Calendar
Leave Approvals
Timesheet Approvals
Expense Approvals
Employee Goals
Performance Reviews
Recruitment Requests
Open Positions
Team Compensation
Team Analytics
One-to-Ones
```

------------------------------------------------------------------------

## 23. Administration & Settings

``` text
Settings
├── Company
│   ├── Company Profile
│   ├── Legal Entities
│   ├── Locations
│   ├── Departments
│   └── Company Settings
│
├── HR
│   ├── Employee Settings
│   ├── Leave Settings
│   ├── Attendance Settings
│   ├── Performance Settings
│   └── Recruitment Settings
│
├── Payroll
│   ├── Salary Settings
│   ├── Payroll Settings
│   ├── Tax Settings
│   └── Payslip Settings
│
├── Security
│   ├── Users
│   ├── Roles
│   ├── Permissions
│   ├── MFA
│   ├── Sessions
│   └── Password Policy
│
├── Communications
│   ├── Email Settings
│   ├── SMS Settings
│   ├── Notifications
│   └── Templates
│
├── Appearance
│   ├── Theme Settings
│   ├── Branding
│   └── Logo
│
└── Platform
    ├── Integrations
    ├── API Keys
    ├── Webhooks
    ├── Audit Logs
    └── Data Management
```

------------------------------------------------------------------------

## 24. Security & Access Control

Dedicated screens:

-   Users
-   Roles
-   Permissions
-   Role-Permission Matrix
-   Login History
-   Active Sessions
-   MFA
-   Password Policy
-   API Keys
-   Audit Logs
-   Security Events

Suggested RBAC hierarchy:

``` text
Super Admin
   ↓
HR Admin
   ↓
Payroll Admin / Recruiter / Finance
   ↓
Manager
   ↓
Employee

Auditor = independent read/audit access where authorized
```

Sensitive actions such as salary changes, bank-detail changes and
termination should use both RBAC and approval workflows.

------------------------------------------------------------------------

## 25. Integrations

Create an **Integration Centre** for categories such as:

-   Microsoft 365
-   Google Workspace
-   Slack / Microsoft Teams
-   Accounting systems
-   Payroll providers
-   SSO / SAML / OIDC
-   Biometric terminals
-   NFC attendance devices
-   Email / SMS providers
-   Calendars
-   Job boards
-   Background-check providers

------------------------------------------------------------------------

## Recommended Final Sidebar

Do not expose 200+ screens directly. Use expandable modules:

``` text
🏠 Dashboard

👥 People
   Employees
   Organisation
   Departments
   Positions
   Documents

🕐 Time & Attendance
   Attendance
   Timesheets
   Shifts
   Overtime

🌴 Leave
   Requests
   Calendar
   Balances
   Holidays

💷 Payroll
   Payroll Runs
   Salaries
   Payslips
   Earnings
   Deductions

💳 Expenses

🎯 Performance
   Goals
   Reviews
   Appraisals
   Feedback

🎓 Learning
   Courses
   Training
   Skills
   Certifications

💼 Recruitment
   Jobs
   Candidates
   Pipeline
   Interviews
   Offers

🚀 Onboarding

❤️ Engagement

🎁 Benefits

💻 Assets

🔄 Employee Lifecycle
   Promotions
   Transfers
   Disciplinary
   Termination
   Offboarding

📄 Documents

🎫 HR Helpdesk

📊 Reports & Analytics

📢 Announcements

✅ Approvals

⚙️ Settings
```

The platform can contain roughly **230 functional screens/views**, while
each user sees only the modules permitted by their role.

------------------------------------------------------------------------

# Features That Can Make the Platform Stand Out

The product should be designed around four major differentiators:

1.  **Employee 360°**
2.  **Workflow Automation**
3.  **Advanced HR Analytics**
4.  **AI-Assisted HR Operations**

Example AI interactions:

-   "Show employees whose contracts expire in the next 60 days."
-   "Which department has the highest absence rate?"
-   "Prepare Sarah's promotion letter."
-   "Show employees overdue for performance reviews."
-   "Summarize current recruitment bottlenecks."
-   "Show outstanding HR approvals."

## HR Command Centre

A central command centre can combine:

-   Workforce health
-   Headcount
-   Payroll cost
-   Recruitment funnel
-   Absence trends
-   Expiring documents
-   Compliance alerts
-   Pending approvals
-   Employee lifecycle events
-   AI-generated HR insights

------------------------------------------------------------------------

# Suggested Service Architecture

For a Spring Boot + Next.js implementation, the platform can be
modularized into services such as:

``` text
employee-service
organisation-service
attendance-service
leave-service
payroll-service
expense-service
recruitment-service
onboarding-service
performance-service
learning-service
engagement-service
benefits-service
asset-service
document-service
helpdesk-service
workflow-service
notification-service
reporting-service
audit-service
auth-service
integration-service
```

## Suggested Frontend

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   TanStack Query
-   TanStack Table
-   React Hook Form
-   Zod
-   Recharts

## Suggested Backend

-   Java
-   Spring Boot
-   Spring Security
-   PostgreSQL
-   Redis
-   Kafka where asynchronous events are useful
-   Object storage for employee documents
-   OpenTelemetry for observability

------------------------------------------------------------------------

# Product Vision

The objective should not simply be to create an HR dashboard containing
many CRUD screens.

The product should become an integrated **Human Resources Operating
Platform** covering the complete employee lifecycle:

``` text
Candidate
   ↓
Applicant
   ↓
Interview
   ↓
Offer
   ↓
New Hire
   ↓
Onboarding
   ↓
Active Employee
   ↓
Attendance / Leave / Payroll
   ↓
Goals / Performance / Learning
   ↓
Promotion / Transfer / Development
   ↓
Resignation / Termination
   ↓
Offboarding
   ↓
Former Employee / Alumni
```

Every stage should share the same employee identity, workflow engine,
document management, notifications, reporting, audit history and
access-control framework.
