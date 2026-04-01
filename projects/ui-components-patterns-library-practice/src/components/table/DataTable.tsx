import { useMemo, useState } from "react";
import { sortByKey } from "../../helpers/table";

type Column<T> = {
  key: keyof T;
  label: string;
};

type DataTableProps<T extends Record<string, unknown>> = {
  title: string;
  columns: Column<T>[];
  rows: T[];
};

export function DataTable<T extends Record<string, unknown>>({
  title,
  columns,
  rows,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T>(columns[0].key);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const sortedRows = useMemo(() => {
    return sortByKey(rows, sortKey, direction);
  }, [rows, sortKey, direction]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setDirection("asc");
  };

  return (
    <section className="card">
      <div className="section-header">
        <h2>{title}</h2>
        <span className="badge">{rows.length} rows</span>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)}>
                  <button
                    type="button"
                    className="sort-button"
                    onClick={() => handleSort(column.key)}
                  >
                    {column.label}
                    {sortKey === column.key
                      ? direction === "asc"
                        ? " ↑"
                        : " ↓"
                      : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedRows.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {String(row[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}