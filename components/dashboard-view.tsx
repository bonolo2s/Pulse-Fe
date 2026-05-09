"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCards } from "@/components/stat-cards"
import { EndpointList } from "@/components/endpoint-list"
import { AddEndpointDialog } from "@/components/add-endpoint-dialog"
import { endpoints as initialEndpoints, getStatusCounts, type Endpoint } from "@/lib/data"

export function DashboardView() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(initialEndpoints)
  const [addOpen, setAddOpen] = useState(false)

  const counts = getStatusCounts(endpoints)

  function handleAdd(ep: Endpoint) {
    setEndpoints((prev) => [ep, ...prev])
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Monitor your infrastructure health and latencies in real-time.
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Add Endpoint
        </Button>
      </div>

      {/* Stats */}
      <StatCards
        total={counts.total}
        operational={counts.operational}
        downtime={counts.downtime}
        avgUptime={counts.avgUptime}
      />

      {/* Endpoint List */}
      <EndpointList endpoints={endpoints} />

      {/* Add dialog */}
      <AddEndpointDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  )
}
