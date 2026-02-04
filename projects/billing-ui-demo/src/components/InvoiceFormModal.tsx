import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "./Modal";
import type { Invoice, InvoiceStatus } from "../types/invoice";

const schema = z.object({
  accountName: z.string().min(2, "Account name must be at least 2 characters"),
  invoiceNumber: z.string().regex(/^INV-\d{4,}$/i, "Use format like INV-1001"),
  serviceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  amountDollars: z
    .string()
    .refine((v) => !Number.isNaN(Number(v)), "Amount must be a number")
    .refine((v) => Number(v) > 0, "Amount must be greater than 0"),
  status: z.custom<InvoiceStatus>(),
  notes: z.string().max(300, "Notes must be <= 300 chars").optional(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  isOpen: boolean;
  mode: "create" | "edit";
  initial?: Invoice | null;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
};

export function InvoiceFormModal({ isOpen, mode, initial, onClose, onSave }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountName: "",
      invoiceNumber: "INV-",
      serviceDate: "",
      amountDollars: "",
      status: "Open",
      notes: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initial) {
      reset({
        accountName: initial.accountName,
        invoiceNumber: initial.invoiceNumber,
        serviceDate: initial.serviceDate,
        amountDollars: String((initial.amountCents / 100).toFixed(2)),
        status: initial.status,
        notes: initial.notes ?? "",
      });
    } else {
      reset({
        accountName: "",
        invoiceNumber: "INV-",
        serviceDate: "",
        amountDollars: "",
        status: "Open",
        notes: "",
      });
    }
  }, [isOpen, mode, initial, reset]);

  function toInvoice(values: FormValues): Invoice {
    const now = Date.now();
    const amountCents = Math.round(Number(values.amountDollars) * 100);

    if (mode === "edit" && initial) {
      return {
        ...initial,
        accountName: values.accountName.trim(),
        invoiceNumber: values.invoiceNumber.toUpperCase().trim(),
        serviceDate: values.serviceDate,
        amountCents,
        status: values.status,
        notes: values.notes?.trim() || undefined,
        updatedAt: now,
      };
    }

    return {
      id: crypto.randomUUID(),
      accountName: values.accountName.trim(),
      invoiceNumber: values.invoiceNumber.toUpperCase().trim(),
      serviceDate: values.serviceDate,
      amountCents,
      status: values.status,
      notes: values.notes?.trim() || undefined,
      updatedAt: now,
    };
  }

  return (
    <Modal
      title={mode === "create" ? "Add invoice (demo)" : "Edit invoice (demo)"}
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <button className="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button
            className="primary"
            onClick={handleSubmit((values) => {
              onSave(toInvoice(values));
              onClose();
            })}
            disabled={isSubmitting || (mode === "edit" && !isDirty)}
          >
            {mode === "create" ? "Create" : "Save changes"}
          </button>
        </>
      }
    >
      <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="label">Account name</label>
          <input placeholder="e.g., Green Valley Clinic" {...register("accountName")} />
          {errors.accountName && <div className="error">{errors.accountName.message}</div>}
        </div>

        <div>
          <label className="label">Invoice number</label>
          <input placeholder="INV-1001" {...register("invoiceNumber")} />
          {errors.invoiceNumber && <div className="error">{errors.invoiceNumber.message}</div>}
        </div>

        <div>
          <label className="label">Service date</label>
          <input placeholder="YYYY-MM-DD" {...register("serviceDate")} />
          {errors.serviceDate && <div className="error">{errors.serviceDate.message}</div>}
        </div>

        <div>
          <label className="label">Amount (USD)</label>
          <input placeholder="125.00" {...register("amountDollars")} />
          {errors.amountDollars && <div className="error">{errors.amountDollars.message}</div>}
        </div>

        <div>
          <label className="label">Status</label>
          <select {...register("status")}>
            <option value="Open">Open</option>
            <option value="Paid">Paid</option>
            <option value="Denied">Denied</option>
          </select>
        </div>

        <div className="full">
          <label className="label">Notes (optional)</label>
          <textarea rows={3} {...register("notes")} />
          {errors.notes && <div className="error">{errors.notes.message}</div>}
          <div className="small">Sanitized demo: do not enter real patient info.</div>
        </div>
      </form>
    </Modal>
  );
}
