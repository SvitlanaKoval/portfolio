import { useMemo, useState } from "react";
import { seedInvoices } from "./data/seed";
import type { Invoice } from "./types/invoice";
import { InvoiceTable } from "./components/InvoiceTable";
import { InvoiceFormModal } from "./components/InvoiceFormModal";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { formatMoney } from "./utils/format";
import './styles.css';
import './App.css';

export default function App() {
  // Source of truth for the demo
  const [invoices, setInvoices] = useState<Invoice[]>(seedInvoices);

  // Modal state
  const [isFormOpen, setFormOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<Invoice | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Invoice | null>(null);

  // Derived values (demo KPIs)
  const kpis = useMemo(() => {
    const total = invoices.reduce((sum, i) => sum + i.amountCents, 0);
    const open = invoices.filter((i) => i.status === "Open").length;
    const denied = invoices.filter((i) => i.status === "Denied").length;
    return { total, open, denied };
  }, [invoices]);

  function openCreate() {
    setMode("create");
    setSelected(null);
    setFormOpen(true);
  }

  function openEdit(inv: Invoice) {
    setMode("edit");
    setSelected(inv);
    setFormOpen(true);
  }

  function upsertInvoice(inv: Invoice) {
    setInvoices((prev) => {
      const exists = prev.some((p) => p.id === inv.id);
      return exists ? prev.map((p) => (p.id === inv.id ? inv : p)) : [inv, ...prev];
    });
  }

  function confirmDelete(inv: Invoice) {
    setDeleteTarget(inv);
  }

  function doDelete() {
    if (!deleteTarget) return;
    setInvoices((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  // 👉 THIS is what App RETURNS (JSX)
  return (
    <div className="container">
      {/* Header */}
      <div className="row-between" style={{ marginBottom: 16 }}>
        <div>
          <h1>Billing UI Demo</h1>
          <p className="muted">
            Public, sanitized demo showing table filtering/sorting, validated forms,
            and modal workflows.
          </p>
        </div>
        <button className="primary" onClick={openCreate}>
          + Add invoice
        </button>
      </div>

      {/* KPI summary */}
      <div className="kpi" style={{ marginBottom: 16 }}>
        <div className="k">
          <div className="small">Total amount (demo)</div>
          <div className="v">{formatMoney(kpis.total)}</div>
        </div>
        <div className="k">
          <div className="small">Open invoices</div>
          <div className="v">{kpis.open}</div>
        </div>
        <div className="k">
          <div className="small">Denied invoices</div>
          <div className="v">{kpis.denied}</div>
        </div>
      </div>

      {/* Main table */}
      <InvoiceTable
        invoices={invoices}
        onEdit={openEdit}
        onDelete={confirmDelete}
      />

      {/* Create / Edit modal */}
      <InvoiceFormModal
        isOpen={isFormOpen}
        mode={mode}
        initial={selected}
        onClose={() => setFormOpen(false)}
        onSave={upsertInvoice}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete invoice?"
        message={
          deleteTarget
            ? `This will permanently remove ${deleteTarget.invoiceNumber}.`
            : ""
        }
        confirmText="Delete"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={doDelete}
      />
    </div>
  );
}