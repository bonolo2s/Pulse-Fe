"use client"

import { useState } from "react"
import { Bell, AlertTriangle, AlertOctagon, CheckCircle2, Zap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { alerts as initialAlerts, type Alert } from "@/lib/data"
import { cn } from "@/lib/shared/utils"

const alertTypeConfig: Record<
  Alert["type"],
  { icon: typeof Bell; iconClass: string; bgClass: string; label: string }
> = {
  downtime: {
    icon: AlertOctagon,
    iconClass: "text-status-downtime",
    bgClass: "bg-status-downtime/10",
    label: "Downtime",
  },
  degraded: {
    icon: AlertTriangle,
    iconClass: "text-status-degraded",
    bgClass: "bg-status-degraded/10",
    label: "Degraded",
  },
  recovery: {
    icon: CheckCircle2,
    iconClass: "text-status-operational",
    bgClass: "bg-status-operational/10",
    label: "Recovery",
  },
  latency: {
    icon: Zap,
    iconClass: "text-status-degraded",
    bgClass: "bg-status-degraded/10",
    label: "Latency",
  },
}

export default function AlertsPage() {
  const [alertsList, setAlertsList] = useState<Alert[]>(initialAlerts)
  const [filter, setFilter] = useState<"all" | "unacknowledged">("all")

  const filtered =
    filter === "all"
      ? alertsList
      : alertsList.filter((a) => !a.acknowledged)

  const unackCount = alertsList.filter((a) => !a.acknowledged).length

  function acknowledgeAlert(id: string) {
    setAlertsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    )
  }

  function acknowledgeAll() {
    setAlertsList((prev) => prev.map((a) => ({ ...a, acknowledged: true })))
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Alerts</h1>
          <p className="text-sm text-muted-foreground">
            View and manage alerts from your monitored endpoints.
          </p>
        </div>
        {unackCount > 0 && (
          <Button variant="outline" onClick={acknowledgeAll} className="gap-2">
            <Check className="size-4" />
            Acknowledge All ({unackCount})
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All ({alertsList.length})
        </Button>
        <Button
          variant={filter === "unacknowledged" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("unacknowledged")}
        >
          Unacknowledged ({unackCount})
        </Button>
      </div>

      {/* Alert list */}
      <div className="rounded-xl border bg-card">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16">
            <Bell className="size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No alerts to display.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((alert) => {
              const config = alertTypeConfig[alert.type]
              const Icon = config.icon
              return (
                <li
                  key={alert.id}
                  className={cn(
                    "flex items-start gap-4 px-5 py-4",
                    !alert.acknowledged && "bg-accent/30"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
                      config.bgClass
                    )}
                  >
                    <Icon className={cn("size-4", config.iconClass)} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-card-foreground">
                        {alert.endpointName}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] uppercase tracking-wide"
                      >
                        {config.label}
                      </Badge>
                      {!alert.acknowledged && (
                        <Badge className="bg-status-downtime/10 text-status-downtime border-0 text-[10px]">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground/70">{alert.timestamp}</p>
                  </div>
                  {!alert.acknowledged && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="shrink-0 text-xs"
                    >
                      Acknowledge
                    </Button>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
