"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api/trpc/react";
import type { ExpenseItem } from "@/lib/api/trpc/types";
import {
  EXPENSE_CATEGORIES,
  createExpenseSchema,
  type ExpenseFormInput,
  type ExpenseFormValues,
} from "@/lib/validation/expense";

const toIsoDate = (displayDate: string) => {
  const parsed = parse(displayDate, "dd MMM yyyy", new Date());
  return Number.isNaN(parsed.getTime()) ? "" : format(parsed, "yyyy-MM-dd");
};

const defaults: ExpenseFormValues = {
  employeeId: "",
  category: "Travel",
  description: "",
  date: "",
  amount: 0,
  receiptName: "",
};

/**
 * Shared create/edit expense form in a drawer (blueprint: drawers for
 * medium forms). Edit mode only applies to rejected claims, which are
 * resubmitted to Pending on save.
 */
const ExpenseFormDrawer = ({
  claim,
  onClose,
}: {
  claim: ExpenseItem | "new" | null;
  onClose: () => void;
}) => {
  const utils = api.useUtils();
  const isEdit = claim !== "new" && claim !== null;

  const form = useForm<ExpenseFormInput, unknown, ExpenseFormValues>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: defaults,
  });

  useEffect(() => {
    if (claim && claim !== "new") {
      form.reset({
        employeeId: claim.employeeId,
        category: claim.category as ExpenseFormValues["category"],
        description: claim.description,
        date: toIsoDate(claim.date),
        amount: claim.amount,
        receiptName: claim.receiptName ?? "",
      });
    } else {
      form.reset(defaults);
    }
  }, [claim, form]);

  const { data: people } = api.people.list.useQuery();

  const onSuccess = async (message: string) => {
    toast.success(message);
    await utils.expenses.list.invalidate();
    onClose();
  };

  const createMutation = api.expenses.create.useMutation({
    onSuccess: () => onSuccess("Expense claim submitted for approval."),
    onError: (error) => toast.error(error.message),
  });
  const updateMutation = api.expenses.update.useMutation({
    onSuccess: () => onSuccess("Expense claim resubmitted for approval."),
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    if (isEdit && claim) {
      await updateMutation.mutateAsync({ ...values, id: claim.id });
    } else {
      await createMutation.mutateAsync(values);
    }
  });

  return (
    <Sheet open onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-4">
        <SheetHeader className="mb-5 p-0">
          <SheetTitle>{isEdit ? "Edit Expense Claim" : "Submit Expense"}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Rejected claims can be corrected and resubmitted; they return to Pending for approval."
              : "Claims above policy limits route to Finance for a second approval."}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField control={form.control} name="employeeId" render={({ field }) => (
              <FormItem>
                <FormLabel>Employee</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(people ?? []).map((person) => (
                      <SelectItem key={person.id} value={person.id}>{person.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EXPENSE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea rows={2} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="amount" render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (GBP)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      {...field}
                      value={field.value as number}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormItem>
              <FormLabel>Receipt (optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    form.setValue("receiptName", file?.name ?? "", { shouldDirty: true });
                  }}
                />
              </FormControl>
              {form.watch("receiptName") && (
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-300">
                  Attached: {form.watch("receiptName")}
                </p>
              )}
              <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-300">
                Receipt OCR extraction of merchant, date and VAT is planned.
              </p>
            </FormItem>

            <div className="sticky bottom-0 flex justify-end gap-2 border-t border-neutral-200 dark:border-slate-600 bg-white dark:bg-slate-900 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : isEdit ? "Resubmit claim" : "Submit claim"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ExpenseFormDrawer;
