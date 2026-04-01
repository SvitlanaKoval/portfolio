export function sortByKey<T extends Record<string, unknown>>(
  rows: T[],
  key: keyof T,
  direction: "asc" | "desc"
): T[] {
  const sorted = [...rows].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (aValue > bValue) return 1;
    if (aValue < bValue) return -1;
    return 0;
  });

  return direction === "asc" ? sorted : sorted.reverse();
}