"use client";

import { cn } from "@/lib/utils";
import { TBlogView } from "../types";
import { LayoutGrid, TextAlignJustify, TableProperties } from "lucide-react";


export function BlogViewSwitch({ view, onChange, labels, }: { view: TBlogView; onChange: (v: TBlogView) => void; labels: Record<TBlogView, string>; }) {
  const views: { id: TBlogView; label: string; icon: React.ReactNode }[] = [
    { id: "grid", label: labels.grid, icon: <LayoutGrid className="size-4" /> },
    { id: "list", label: labels.list, icon: <TextAlignJustify className="size-4" /> },
    { id: "matrix", label: labels.matrix, icon: <TableProperties className="size-4"/> },
  ];

  return (
    <div className="inline-flex items-center gap-px overflow-hidden rounded-full border border-rule bg-ink-850 p-1 md:justify-self-end">
      {views.map((v) => (
        <button
          key={v.id}
          type="button"
          data-cursor="link"
          data-cursor-label={v.label}
          onClick={() => onChange(v.id)}
          className={cn(
            "flex items-center gap-2 rounded-full px-3 py-2 text-xs transition-colors",
            view === v.id
              ? "bg-bone-100 text-ink-900"
              : "text-bone-400 hover:text-bone-100"
          )}
        >
          {v.icon}
          <span>{v.label}</span>
        </button>
      ))}
    </div>
  );
}

export default BlogViewSwitch;