"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { StatusBadge } from "@/components/status-badge"
import type { Endpoint } from "@/lib/data"
import { Clock, Globe, Zap, Timer } from "lucide-react"

interface EndpointDetailProps {
  endpoint: Endpoint | null
  open: boolean
  onClose: () => void
}

// Generate synthetic uptime history bars
function generateBars() {
  return Array.from({ length: 30 }, (_, i) => {
    const rand = Math.random()
    if (i === 5 || i === 12) return "downtime"
    if (i === 6 || i === 20) return "degraded"
    if (rand > 0.95) return "degraded"
    return "operational"
  })
}

export function EndpointDetail({ endpoint, open, onClose }: EndpointDetailProps) {
  if (!endpoint) return null

  const bars = generateBars()

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <StatusBadge status={endpoint.status} />
            <DialogTitle className="text-base">{endpoint.name}</DialogTitle>
          </div>
          <DialogDescription className="font-mono text-xs">
            {endpoint.url}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-lg border bg-accent/30 p-3">
            <Globe className="size-4 text-muted-foreground" />
            <div>
              <p className="text-[11px] text-muted-foreground">Uptime</p>
              <p className="text-sm font-semibold text-foreground">{endpoint.uptime.toFixed(2)}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-accent/30 p-3">
            <Zap className="size-4 text-muted-foreground" />
            <div>
              <p className="text-[11px] text-muted-foreground">Response Time</p>
              <p className="text-sm font-semibold text-foreground">
                {endpoint.responseTime === 0 ? "N/A" : `${endpoint.responseTime}ms`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-accent/30 p-3">
            <Timer className="size-4 text-muted-foreground" />
            <div>
              <p className="text-[11px] text-muted-foreground">Check Interval</p>
              <p className="text-sm font-semibold text-foreground">Every {endpoint.checkInterval}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-accent/30 p-3">
            <Clock className="size-4 text-muted-foreground" />
            <div>
              <p className="text-[11px] text-muted-foreground">Last Checked</p>
              <p className="text-sm font-semibold text-foreground">{endpoint.lastChecked}</p>
            </div>
          </div>
        </div>

        {/* Uptime history bars */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground">30-Day Uptime History</p>
          <div className="flex gap-[3px]">
            {bars.map((status, i) => (
              <div
                key={i}
                className={`h-7 flex-1 rounded-sm ${
                  status === "operational"
                    ? "bg-status-operational"
                    : status === "degraded"
                    ? "bg-status-degraded"
                    : "bg-status-downtime"
                }`}
                title={`Day ${i + 1}: ${status}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
