export function ContactSummary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-rule-soft pb-2 last:border-b-0">
      <dt className="chip-mono">{label}</dt>
      <dd className="text-bone-100 truncate max-w-[60%] text-right">{value}</dd>
    </div>
  );
}
