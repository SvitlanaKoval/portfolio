export type SortDir = "asc" | "desc";

export function sortBy<T extends Record<string, any>>(
  items: T[],
  key: keyof T,
  dir: SortDir
): T[] {
  const sorted = [...items].sort((a, b) => {
    const av = a[key];
    const bv = b[key];

    if (typeof av === "number" && typeof bv === "number") return av - bv;
    return String(av).localeCompare(String(bv));
  });

  return dir === "asc" ? sorted : sorted.reverse();
}
