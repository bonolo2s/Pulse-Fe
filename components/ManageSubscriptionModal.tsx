"use client"

import { X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Subscription } from "@/lib"

interface ManageSubscriptionModalProps {
  open: boolean
  onClose: () => void
  subscription: Subscription | null
  onCancel: () => void
}

export function ManageSubscriptionModal({ open, onClose, subscription, onCancel }: ManageSubscriptionModalProps) {
  if (!open || !subscription) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-background p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Settings className="size-5" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Manage Subscription</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-medium text-foreground">
              {subscription.plan} — ${subscription.monthlyPrice}/month
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Renews on</span>
            <span className="font-medium text-foreground">
              {subscription.expiresAt
                ? new Date(subscription.expiresAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="destructive" onClick={onCancel}>
            Cancel Subscription
          </Button>
        </div>
      </div>
    </div>
  )
}