"use client";

import { Plus, Search } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { departments, employees, type EmployeeStatus } from "@/mocks/employees";

const PAGE_SIZE = 8;

const statusStyles: Record<EmployeeStatus, string> = {
  Active: "bg-green-600/15 text-green-600 border-green-600",
  "On Leave": "bg-yellow-500/15 text-yellow-600 border-yellow-500",
  Inactive: "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400",
};

const EmployeesTable = () => {
  const searchParams = useSearchParams();
  const departmentParam = searchParams.get("department");
  const initialDepartment =
    departmentParam && departments.includes(departmentParam) ? departmentParam : "all";

  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState(initialDepartment);
  const [status, setStatus] = useState<"all" | EmployeeStatus>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return employees.filter((employee) => {
      const matchesQuery =
        !q ||
        employee.name.toLowerCase().includes(q) ||
        employee.email.toLowerCase().includes(q) ||
        employee.position.toLowerCase().includes(q) ||
        employee.department.toLowerCase().includes(q) ||
        employee.employeeCode.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || employee.department === department;
      const matchesStatus = status === "all" || employee.status === status;
      return matchesQuery && matchesDepartment && matchesStatus;
    });
  }, [query, department, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateFilter = (setter: () => void) => {
    setter();
    setPage(1);
  };

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => updateFilter(() => setQuery(event.target.value))}
            placeholder="Search employees..."
            className="ps-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={department}
            onValueChange={(value) => updateFilter(() => setDepartment(value))}
          >
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={status}
            onValueChange={(value) => updateFilter(() => setStatus(value as typeof status))}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => toast("Add Employee isn't wired up yet.")}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Employee</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Department</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Position</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Location</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Joined</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No employees match your filters.
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{employee.name}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">
                          {employee.employeeCode} · {employee.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {employee.department}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {employee.position}
                    <span className="block text-sm text-neutral-500 dark:text-neutral-300">
                      {employee.employmentType}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {employee.location}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {employee.joinDate}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span
                      className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${statusStyles[employee.status]}`}
                    >
                      {employee.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-5">
        <p className="text-sm text-neutral-500 dark:text-neutral-300">
          {filtered.length === 0
            ? "0 results"
            : `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-neutral-500 dark:text-neutral-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;
