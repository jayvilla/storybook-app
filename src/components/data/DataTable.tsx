"use client";
import React, { useState } from "react";
import clsx from "clsx";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  initialSortKey?: keyof T;
  className?: string;
};

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  initialSortKey,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(initialSortKey);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA == null || valB == null) return 0;
      const cmp =
        typeof valA === "number"
          ? valA - (valB as number)
          : String(valA).localeCompare(String(valB));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  function handleSort(col: Column<T>) {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.key);
      setSortDir("asc");
    }
  }

  return (
    <div className={clsx("overflow-x-auto", className)} data-testid="datatable">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={clsx(
                  "px-4 py-2 border-b cursor-pointer select-none",
                  col.sortable && "hover:bg-gray-100"
                )}
                onClick={() => handleSort(col)}
              >
                <div className="flex items-center justify-between">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <span className="ml-1 text-xs opacity-70">
                      {sortDir === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr
              key={i}
              className={i % 2 ? "bg-white" : "bg-gray-50"}
              data-testid="datatable-row"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-4 py-2 border-b text-gray-700"
                >
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
