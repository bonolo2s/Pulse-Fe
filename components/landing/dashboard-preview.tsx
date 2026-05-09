"use client"

import { Globe, TrendingUp, AlertOctagon, Clock, ChevronRight } from "lucide-react"

const stats = [
  { label: "Total Endpoints", value: "5", icon: Globe },
  { label: "Operational", value: "3", icon: TrendingUp },
  { label: "Downtime", value: "1", icon: AlertOctagon },
  { label: "Avg Uptime", value: "96.54%", sub: "Last 30d", icon: Clock },
]

const services = [
  { name: "Production API", url: "api.acme.com/v1/health", status: "operational", uptime: "99.99%", lastChecked: "1 min ago" },
  { name: "Payment Webhook", url: "payments.acme.com/webhook", status: "degraded", uptime: "98.45%", lastChecked: "1 min ago" },
  { name: "Staging Environment", url: "staging.api.acme.com", status: "downtime", uptime: "85.20%", lastChecked: "8 min ago" },
]

const statusConfig: Record<string, { dotClass: string; label: string; badgeClass: string }> = {
  operational: { dotClass: "bg-status-operational", label: "OPERATIONAL", badgeClass: "border-status-operational/30 bg-status-operational/10 text-status-operational" },
  degraded: { dotClass: "bg-status-degraded", label: "DEGRADED", badgeClass: "border-status-degraded/30 bg-status-degraded/10 text-status-degraded" },
  downtime: { dotClass: "bg-status-downtime", label: "DOWNTIME", badgeClass: "border-status-downtime/30 bg-status-downtime/10 text-status-downtime" },
}

export function DashboardPreview() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-primary/5">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
            <span className="size-3 rounded-full bg-status-downtime/60" />
            <span className="size-3 rounded-full bg-status-degraded/60" />
            <span className="size-3 rounded-full bg-status-operational/60" />
            <span className="ml-3 text-xs text-muted-foreground">pulse.app/dashboard</span>
          </div>

          <div className="p-4 sm:p-6">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 rounded-lg border border-border bg-background p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground sm:text-xs">{stat.label}</span>
                    <stat.icon className="size-3.5 text-muted-foreground/60" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-card-foreground sm:text-2xl">{stat.value}</span>
                    {stat.sub && <span className="text-[10px] text-muted-foreground">{stat.sub}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Service list */}
            <div className="mt-5 rounded-lg border border-border sm:mt-6">
              <div className="border-b border-border px-4 py-3">
                <span className="text-sm font-semibold text-card-foreground">Monitored Services</span>
              </div>
              <ul className="divide-y divide-border">
                {services.map((s) => {
                  const cfg = statusConfig[s.status]
                  return (
                    <li key={s.name} className="flex items-center gap-3 px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cfg.badgeClass}`}>
                        <span className={`size-1.5 rounded-full ${cfg.dotClass}`} />
                        <span className="hidden sm:inline">{cfg.label}</span>
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium text-card-foreground">{s.name}</span>
                        <span className="hidden truncate text-xs text-muted-foreground sm:block">{s.url}</span>
                      </div>
                      <div className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
                        <span>{s.uptime}</span>
                        <span>{s.lastChecked}</span>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground/40" />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
