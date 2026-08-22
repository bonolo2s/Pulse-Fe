"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { initiateCheckout } from "@/lib"

interface UpgradeModalProps {
  open: boolean
  onClose: () => void
    reason?: "limit" | "manual"
}

export function UpgradeModal({ open, onClose, reason = "manual" }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleUpgrade() {
    setLoading(true)
    setErrorMessage(null)

    const response = await initiateCheckout()

    if (response.error) {
      setErrorMessage(response.message)
      setLoading(false)
      return
    }

    window.location.href = response.result.authorizationUrl
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-4 text-primary" />
            </div>
            <DialogTitle>Upgrade to Pro</DialogTitle>
          </div>
          <DialogDescription>
            {reason === "limit"
              ? "You've hit the Free plan limit. Upgrade to Pro for unlimited endpoints, faster check intervals, and full history."
              : "Upgrade to Pro for unlimited endpoints, faster check intervals, and full history."}
          </DialogDescription>
        </DialogHeader>

        {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="button" onClick={handleUpgrade} disabled={loading}>
            {loading ? "Redirecting..." : "Upgrade to Pro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}