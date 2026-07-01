import { cn } from "@/lib/shared/utils"
import type { EndpointStatus } from "@/lib/data"

const statusConfig: Record<
  EndpointStatus,
  { label: string; dotClass: string; bgClass: string; textClass: string }
> = {
  operational: {
    label: "OPERATIONAL",
    dotClass: "bg-status-operational",
    bgClass: "bg-status-operational/10",
    textClass: "text-status-operational",
  },
  degraded: {
    label: "DEGRADED",
    dotClass: "bg-status-degraded",
    bgClass: "bg-status-degraded/10",
    textClass: "text-status-degraded",
  },
  downtime: {
    label: "DOWNTIME",
    dotClass: "bg-status-downtime",
    bgClass: "bg-status-downtime/10",
    textClass: "text-status-downtime",
  },
}

export function StatusBadge({ status }: { status: EndpointStatus }) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
        config.bgClass,
        config.textClass
      )}
    >
      <span className={cn("size-1.5 rounded-full", config.dotClass)} />
      {config.label}
    </span>
  )
}
