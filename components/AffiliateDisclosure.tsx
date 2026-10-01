import { LuInfo } from "react-icons/lu";

type AffiliateDisclosureProps = {
  className?: string;
};

export function AffiliateDisclosure({ className = "" }: AffiliateDisclosureProps) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border border-slate-200/80 bg-slate-50/70 p-3.5 text-xs leading-relaxed text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 ${className}`}
      role="note"
      aria-label="Affiliate link disclosure"
    >
      <LuInfo className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400" />
      <p>
        <strong className="font-semibold text-slate-900 dark:text-slate-200">Affiliate Disclosure:</strong>{" "}
        Some links on this platform are affiliate links. If you make a booking or purchase through these links, we may earn a commission at no additional cost to you.
      </p>
    </div>
  );
}
