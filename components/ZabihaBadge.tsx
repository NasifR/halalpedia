import { ZabihaStatus } from "@/data/restaurants";

interface ZabihaBadgeProps {
  status: ZabihaStatus;
  size?: "sm" | "md";
}

// Only render a badge if zabiha confirmed. Unknown = no badge shown in card context.
const config: Record<ZabihaStatus, { label: string; className: string; icon: string } | null> = {
  yes: {
    label: "Zabiha Halal",
    icon: "✓",
    className: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  },
  unknown: null, // No badge on cards; detail page handles its own messaging
};

interface ZabihaBadgeProps {
  status: ZabihaStatus;
  size?: "sm" | "md";
  showUnknown?: boolean; // Only used on detail page
}

export default function ZabihaBadge({ status, size = "md", showUnknown = false }: ZabihaBadgeProps) {
  if (status === "unknown") {
    if (!showUnknown) return null;
    const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-semibold bg-amber-100 text-amber-800 border border-amber-200 ${sizeClass}`}>
        <span className="font-bold">?</span>
        Halal (Unverified)
      </span>
    );
  }

  const cfg = config[status];
  if (!cfg) return null;

  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${sizeClass} ${cfg.className}`}>
      <span className="font-bold">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
