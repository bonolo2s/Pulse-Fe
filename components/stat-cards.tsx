import { Globe, Activity, AlertTriangle, Clock } from "lucide-react"
import { cn } from "@/lib/shared/utils"

interface StatCardProps {
  label: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  accent?: "default" | "destructive"
}

function StatCard({ label, value, subtitle, icon, accent = "default" }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-card p-5",
        accent === "destructive" && "border-status-downtime/30 bg-status-downtime/[0.03]"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-muted-foreground/60">{icon}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-card-foreground">{value}</span>
        {subtitle && (
          <span className="text-xs font-medium text-muted-foreground">{subtitle}</span>
        )}
      </div>
    </div>
  )
}

interface StatCardsProps {
  total: number
  operational: number
  downtime: number
  avgUptime: number
}

export function StatCards({ total, operational, downtime, avgUptime }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Endpoints"
        value={String(total)}
        icon={<Globe className="size-5" />}
      />
      <StatCard
        label="Operational"
        value={String(operational)}
        icon={<Activity className="size-5" />}
      />
      <StatCard
        label="Downtime"
        value={String(downtime)}
        icon={<AlertTriangle className="size-5" />}
        accent={downtime > 0 ? "destructive" : "default"}
      />
      <StatCard
        label="Avg Uptime"
        value={`${avgUptime.toFixed(2)}%`}
        subtitle="Last 30d"
        icon={<Clock className="size-5" />}
      />
    </div>
  )
}
