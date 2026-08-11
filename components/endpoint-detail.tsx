"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { StatusBadge } from "@/components/status-badge"
import type { Endpoint } from "@/lib/data"
import { Clock, Globe, Zap, Timer, Trash2, Pencil } from "lucide-react"
import { deleteEndpoint, toggleEndpoint } from "@/lib"

interface EndpointDetailProps {
  endpoint: Endpoint | null
  open: boolean
  onClose: () => void
  onDelete: (id: string) => void
  onEdit: (ep: Endpoint) => void
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

export function EndpointDetail({ endpoint, open, onClose, onDelete, onEdit }: EndpointDetailProps) {
  const [isActive, setIsActive] = useState(endpoint?.isActive ?? true)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  useEffect(() => {
    setIsActive(endpoint?.isActive ?? true)
  }, [endpoint?.id, endpoint?.isActive])


  if (!endpoint) return null

  const bars = generateBars()

  async function handleDelete() {
    const response = await deleteEndpoint(endpoint!.id)
    if (!response.error) {
      onDelete(endpoint!.id)
      onClose()
    } else {
      console.error(response.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusBadge status={endpoint.status} />
              <DialogTitle className="text-base">{endpoint.name}</DialogTitle>
            </div>
            <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="size-8" onClick={() => {
              onEdit(endpoint)
              onClose()
            }}>
              <Pencil className="size-4" />
            </Button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {isActive ? "Active" : "Paused"}
                </span>
                <Switch
                  checked={isActive}
                  onCheckedChange={async (checked) => {
                    const response = await toggleEndpoint(endpoint.id)
                    if (!response.error) {
                      setIsActive(checked)
                    } else {
                      console.error(response.message)
                    }
                  }}
                />
              </div>
            </div>
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

        {/* Danger zone */}
        <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-3">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-foreground">Delete this endpoint</span>
            <span className="text-[11px] text-muted-foreground">This action cannot be undone.</span>
          </div>
          {confirmingDelete ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setConfirmingDelete(false)}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Confirm
              </Button>
            </div>
          ) : (
            <Button
              variant="destructive"
              size="sm"
              className="gap-1.5"
              onClick={() => setConfirmingDelete(true)}
            >
              <Trash2 className="size-3.5" />
              Delete
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}