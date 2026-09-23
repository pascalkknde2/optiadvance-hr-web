"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import toast from "react-hot-toast";

import FormActions from "@/components/forms/form-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUnsavedChangesGuard } from "@/hooks/use-unsaved-changes-guard";
import { api } from "@/lib/api/trpc/react";
import type { EmployeeDetail } from "@/lib/api/trpc/types";
import {
  CURRENCIES,
  EMPLOYMENT_TYPES,
  PAY_FREQUENCIES,
  employeeFormDefaults,
  employeeFormSchema,
  employeeWizardSteps,
  type EmployeeFormInput,
  type EmployeeFormValues,
} from "@/lib/validation/employee";
import { format } from "date-fns";

const toIsoDate = (displayDate: string) => {
  const parsed = new Date(displayDate);
  return Number.isNaN(parsed.getTime()) ? "" : format(parsed, "yyyy-MM-dd");
};

function recordToFormValues(record: EmployeeDetail): EmployeeFormValues {
  return {
    firstName: record.firstName,
    lastName: record.lastName,
    preferredName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    workEmail: record.workEmail,
    personalEmail: record.personalEmail,
    phone: record.phone,
    address: record.address,
    department: record.department,
    position: record.position,
    employmentType: record.employmentType as EmployeeFormValues["employmentType"],
    location: record.location,
    manager: record.manager,
    startDate: toIsoDate(record.startDate),
    currency: record.currency as EmployeeFormValues["currency"],
    baseSalary: record.baseSalary,
    payFrequency: record.payFrequency as EmployeeFormValues["payFrequency"],
    salaryEffectiveDate: toIsoDate(record.salaryEffectiveDate),
    bankName: record.bankName,
    accountNumber: record.accountNumber,
    sortCode: record.sortCode,
    documentNames: [],
  };
}

const inputClass = "bg-white dark:bg-slate-800";

const EmployeeWizard = ({ employeeId }: { employeeId?: string }) => {
  const router = useRouter();
  const utils = api.useUtils();
  const isEdit = Boolean(employeeId);
  const [stepIndex, setStepIndex] = useState(0);

  const { data: existing, isLoading } = api.people.get.useQuery(
    { id: employeeId ?? "" },
    { enabled: isEdit },
  );

  // Three generics: zod v4 `coerce` makes the schema input type differ
  // from the transformed output type, and react-hook-form tracks both.
  const form = useForm<EmployeeFormInput, unknown, EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: employeeFormDefaults,
  });
  const { isSubmitting, isDirty } = form.formState;
  useUnsavedChangesGuard(isDirty);

  useEffect(() => {
    if (existing) form.reset(recordToFormValues(existing));
  }, [existing, form]);

  const { data: departments } = api.organisation.list.useQuery();
  const { data: people } = api.people.list.useQuery();

  const createMutation = api.people.create.useMutation({
    onSuccess: async () => {
      toast.success("Employee created — onboarding checklist queued.");
      await utils.people.list.invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = api.people.update.useMutation({
    onSuccess: async () => {
      toast.success("Employee updated.");
      await Promise.all([utils.people.list.invalidate(), utils.people.get.invalidate()]);
    },
    onError: (error) => toast.error(error.message),
  });

  const mapFieldErrors = (fieldErrors: Record<string, string>) => {
    for (const [field, message] of Object.entries(fieldErrors)) {
      form.setError(field as FieldPath<EmployeeFormInput>, { message });
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    const result = isEdit
      ? await updateMutation.mutateAsync({ ...values, id: employeeId ?? "" })
      : await createMutation.mutateAsync(values);
    if (!result.ok) {
      mapFieldErrors(result.fieldErrors);
      return;
    }
    router.push("/people/employees");
  });

  const step = employeeWizardSteps[stepIndex];
  const isLastStep = stepIndex === employeeWizardSteps.length - 1;

  const goNext = async () => {
    const valid = await form.trigger(
      [...step.fields] as FieldPath<EmployeeFormInput>[],
    );
    if (valid) setStepIndex((index) => Math.min(index + 1, employeeWizardSteps.length - 1));
  };

  const goBack = () => setStepIndex((index) => Math.max(0, index - 1));

  if (isEdit && isLoading) {
    return (
      <div className="card flex items-center justify-center gap-2 py-16 text-neutral-500">
        <Loader2 className="animate-spin h-5 w-5" /> Loading employee...
      </div>
    );
  }

  if (isEdit && !existing) {
    return (
      <div className="card py-16 text-center">
        <p className="text-neutral-500 dark:text-neutral-300 mb-4">Employee not found.</p>
        <Button variant="outline" onClick={() => router.push("/people/employees")}>
          Back to directory
        </Button>
      </div>
    );
  }

  const departmentOptions = (departments ?? []).map((department) => department.name);
  const managerOptions = (people ?? []).filter((person) => person.id !== employeeId);

  return (
    <>
      {/* Stepper — numbered circles connected by lines, like the reference:
      the current step is ringed in the accent colour, completed steps are
      filled, upcoming steps are grey. */}
      <div className="card mb-6">
        <ol className="flex items-start">
          {employeeWizardSteps.map((wizardStep, index) => {
            const state =
              index < stepIndex ? "done" : index === stepIndex ? "current" : "todo";
            return (
              <li key={wizardStep.id} className="flex flex-1 items-start last:flex-none">
                <button
                  type="button"
                  onClick={() => state === "done" && setStepIndex(index)}
                  disabled={state === "todo"}
                  className="group flex flex-col items-center gap-1.5"
                  aria-current={state === "current" ? "step" : undefined}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                      state === "done"
                        ? "border-primary bg-primary text-white group-hover:opacity-80"
                        : state === "current"
                          ? "border-primary text-primary"
                          : "border-neutral-300 text-neutral-400 dark:border-slate-600 dark:text-neutral-500"
                    }`}
                  >
                    {state === "done" ? <Check className="h-4 w-4" /> : index + 1}
                  </span>
                  <span
                    className={`hidden whitespace-nowrap text-xs sm:block ${
                      state === "current"
                        ? "font-medium text-foreground"
                        : state === "done"
                          ? "text-neutral-600 dark:text-neutral-300"
                          : "text-neutral-400 dark:text-neutral-500"
                    }`}
                  >
                    {wizardStep.title}
                  </span>
                </button>
                {index < employeeWizardSteps.length - 1 && (
                  <span
                    className={`mx-2 mt-[17px] h-0.5 flex-1 rounded sm:mx-3 ${
                      state === "done" ? "bg-primary" : "bg-neutral-200 dark:bg-slate-600"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="card mb-6">
            <div className="mb-5">
              <h5 className="font-semibold mb-1">
                {step.title}
                <span className="text-neutral-400 font-normal">
                  {" "}
                  · Step {stepIndex + 1} of {employeeWizardSteps.length}
                </span>
              </h5>
              <p className="text-sm text-neutral-500 dark:text-neutral-300">
                {step.description}
              </p>
              {isEdit && existing && (
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-300">
                  {existing.employeeCode} · created{" "}
                  {format(new Date(existing.createdAt), "dd MMM yyyy")} · last modified{" "}
                  {format(new Date(existing.updatedAt), "dd MMM yyyy, HH:mm")}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {step.id === "personal" && (
                <>
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="preferredName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred name (optional)</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of birth (optional)</FormLabel>
                      <FormControl><Input type="date" {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender (optional)</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="nationality" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality (optional)</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </>
              )}

              {step.id === "contact" && (
                <>
                  <FormField control={form.control} name="workEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work email</FormLabel>
                      <FormControl><Input type="email" {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="personalEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal email (optional)</FormLabel>
                      <FormControl><Input type="email" {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (optional)</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Address (optional)</FormLabel>
                      <FormControl><Textarea rows={2} {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </>
              )}

              {step.id === "employment" && (
                <>
                  <FormField control={form.control} name="department" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departmentOptions.map((name) => (
                            <SelectItem key={name} value={name}>{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="position" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="employmentType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClass}>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EMPLOYMENT_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl><Input {...field} placeholder="e.g. London" className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="manager" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manager (optional)</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value === "none" ? "" : value)}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select manager" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">No manager</SelectItem>
                          {managerOptions.map((person) => (
                            <SelectItem key={person.id} value={person.name}>{person.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="startDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start date</FormLabel>
                      <FormControl><Input type="date" {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </>
              )}

              {step.id === "compensation" && (
                <>
                  <FormField control={form.control} name="currency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClass}><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CURRENCIES.map((currency) => (
                            <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="baseSalary" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base salary</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                          value={field.value as number}
                          className={inputClass}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="payFrequency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pay frequency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClass}><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PAY_FREQUENCIES.map((frequency) => (
                            <SelectItem key={frequency} value={frequency}>{frequency}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="salaryEffectiveDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effective date</FormLabel>
                      <FormControl><Input type="date" {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <p className="text-xs text-neutral-500 dark:text-neutral-300 sm:col-span-2">
                    Compensation changes are written to the audit trail with before/after values.
                  </p>
                </>
              )}

              {step.id === "bank" && (
                <>
                  <FormField control={form.control} name="bankName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank name</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="accountNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account number</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="sortCode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort code / IBAN</FormLabel>
                      <FormControl><Input {...field} className={inputClass} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </>
              )}

              {step.id === "documents" && (
                <div className="sm:col-span-2">
                  <FormLabel>Documents</FormLabel>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg"
                    className={`mt-1.5 ${inputClass}`}
                    onChange={(event) => {
                      const names = Array.from(event.target.files ?? []).map((file) => file.name);
                      form.setValue("documentNames", names, { shouldDirty: true });
                    }}
                  />
                  <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-300">
                    Contract, ID and right-to-work evidence. Expiry dates feed the document-expiry alerts.
                  </p>
                  {form.watch("documentNames")?.length ? (
                    <ul className="mt-2 space-y-1 text-sm">
                      {form.watch("documentNames")?.map((name) => (
                        <li key={name} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-green-600" /> {name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={goBack} disabled={stepIndex === 0}>
                Back
              </Button>
              {isLastStep ? null : (
                <Button type="button" onClick={goNext}>
                  Next step
                </Button>
              )}
            </div>

            {isLastStep && (
              <FormActions
                onCancel={() => router.push("/people/employees")}
                isSubmitting={isSubmitting || createMutation.isPending || updateMutation.isPending}
                submitLabel={isEdit ? "Save changes" : "Create employee"}
                alternateSubmitLabel={isEdit ? undefined : "Save & Add Another"}
                onAlternateSubmit={
                  isEdit
                    ? undefined
                    : () =>
                        form.handleSubmit(async (values) => {
                          const result = await createMutation.mutateAsync(values);
                          if (!result.ok) {
                            mapFieldErrors(result.fieldErrors);
                            return;
                          }
                          form.reset(employeeFormDefaults);
                          setStepIndex(0);
                        })()
                }
              />
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default EmployeeWizard;
