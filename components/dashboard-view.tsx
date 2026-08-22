"use client"

import { useState, useEffect } from "react"
import { Plus, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCards } from "@/components/stat-cards"
import { EndpointList } from "@/components/endpoint-list"
import { AddEndpointDialog } from "@/components/add-endpoint-dialog"
import { getStatusCounts } from "@/lib/data"
import type { Endpoint } from "@/lib/data"
import { getEndpoints, mapToUiEndpoint } from "@/lib"
import { UpgradeModal } from "./UpgradeModal"
import { useSubscription } from "@/hooks/useSubscription"
import { ManageSubscriptionModal } from "./ManageSubscriptionModal"

export function DashboardView() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const [editingEndpoint, setEditingEndpoint] = useState<Endpoint | null>(null)
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const { subscription, cancel } = useSubscription()
  const [manageOpen, setManageOpen] = useState(false)

  useEffect(() => {
    async function fetchEndpoints() {
      const userId = localStorage.getItem("userId")
      if (!userId) return

      const response = await getEndpoints(userId)
      if (!response.error) {
        setEndpoints(response.result.map(mapToUiEndpoint))
      }
      setLoading(false)
    }

    fetchEndpoints()
  }, [])

  const counts = getStatusCounts(endpoints)

  function handleAdd(ep: Endpoint) {
    setEndpoints((prev) => [ep, ...prev])
  }

  function handleDelete(id: string) {
  setEndpoints((prev) => prev.filter((ep) => ep.id !== id))
  }

  function handleEdit(ep: Endpoint) {
  setEditingEndpoint(ep)
  }

  function handleUpdate(ep: Endpoint) {
    setEndpoints((prev) => prev.map((e) => (e.id === ep.id ? ep : e)))
    setEditingEndpoint(null)
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
        <div className="flex items-center gap-2">
          {subscription?.plan === "Pro" ? (
            <Button variant="outline" onClick={() => setManageOpen(true)} className="gap-2">
              Manage Subscription
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setUpgradeOpen(true)} className="gap-2">
              <Zap className="size-4" />
              Upgrade to Pro
            </Button>
          )}
          <Button onClick={() => setAddOpen(true)} className="gap-2">
            <Plus className="size-4" />
            Add Endpoint
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StatCards
        total={counts.total}
        operational={counts.operational}
        downtime={counts.downtime}
        avgUptime={counts.avgUptime}
      />

      {/* Endpoint List */}
      <EndpointList endpoints={endpoints} onDelete={handleDelete} onEdit={handleEdit}/>

      {/* Add dialog */}
      <AddEndpointDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
        onLimitReached={() => setUpgradeOpen(true)}
      />
      {/* Edit dialog */}
      <AddEndpointDialog
        open={!!editingEndpoint}
        onClose={() => setEditingEndpoint(null)}
        onAdd={handleUpdate}
        mode="edit"
        endpoint={editingEndpoint ?? undefined}
        onLimitReached={() => setUpgradeOpen(true)}
      />

      {/* Upgrade modal — single instance, shared */}
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
      <ManageSubscriptionModal
      open={manageOpen}
      onClose={() => setManageOpen(false)}
      subscription={subscription}
      onCancel={cancel}
    />
    </div>
  )
}