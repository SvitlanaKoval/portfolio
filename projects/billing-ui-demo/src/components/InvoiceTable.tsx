import { useMemo, useState } from "react";
import type { Invoice, InvoiceStatus } from "../types/invoice";
import { formatMoney } from "../utils/format";
import type { SortDir } from "../utils/sort";
import { sortBy } from "../utils/sort";

type SortState = { key: keyof Invoice; dir: SortDir };

type Props = {
  invoices: Invoice[];
  onEdit: (inv: Invoice) => void;
  onDelete: (inv: Invoice) => void;
};

export function InvoiceTable({ invoices, onEdit, onDelete }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<InvoiceStatus | "All">("All");
  const [sort, setSort] = useState<SortState>({ key: "updatedAt", dir: "desc" });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return invoices.filter((inv) => {
      const matchesQuery =
        !q ||
        inv.accountName.toLowerCase().includes(q) ||
        inv.invoiceNumber.toLowerCase().includes(q);

      const matchesStatus = status === "All" ? true : inv.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [invoices, query, status]);

  const sorted = useMemo(() => sortBy(filtered, sort.key, sort.dir), [filtered, sort]);

  function toggleSort(key: keyof Invoice) {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  }

  function sortIcon(key: keyof Invoice) {
    if (sort.key !== key) return <span className="sort">↕</span>;
    return <span className="sort">{sort.dir === "asc" ? "↑" : "↓"}</span>;
  }

  return (
    <div className="card">
      <div className="row-between">
        <div>
          <h2>Invoices</h2>
          <div className="muted small">
            Filter + sort + modal CRUD (sanitized demo)
          </div>
        </div>

        <div className="row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search account or invoice #"
            aria-label="Search"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value as any)} aria-label="Status filter">
            <option value="All">All statuses</option>
            <option value="Open">Open</option>
            <option value="Paid">Paid</option>
            <option value="Denied">Denied</option>
          </select>
          <span className="badge">{sorted.length} shown</span>
        </div>
      </div>

      <div className="hr" />

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>
                <button onClick={() => toggleSort("invoiceNumber")}>
                  Invoice #{sortIcon("invoiceNumber")}
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort("accountName")}>
                  Account {sortIcon("accountName")}
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort("serviceDate")}>
                  Service date {sortIcon("serviceDate")}
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort("amountCents")}>
                  Amount {sortIcon("amountCents")}
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort("status")}>
                  Status {sortIcon("status")}
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort("updatedAt")}>
                  Updated {sortIcon("updatedAt")}
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.invoiceNumber}</td>
                <td>{inv.accountName}</td>
                <td>{inv.serviceDate}</td>
                <td>{formatMoney(inv.amountCents)}</td>
                <td>
                  <span className="badge">{inv.status}</span>
                </td>
                <td>{new Date(inv.updatedAt).toLocaleString()}</td>
                <td className="row">
                  <button className="ghost" onClick={() => onEdit(inv)}>Edit</button>
                  <button className="danger" onClick={() => onDelete(inv)}>Delete</button>
                </td>
              </tr>
            ))}

            {sorted.length === 0 && (
              <tr>
                <td colSpan={7} className="muted">
                  No results. Try changing filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
