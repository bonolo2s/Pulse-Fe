"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface UpgradeModalProps {
  open: boolean
  onClose: () => void
}

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-4 text-primary" />
            </div>
            <DialogTitle>Pro is coming soon</DialogTitle>
          </div>
          <DialogDescription>
            You've hit the Free plan limit. Upgrading isn't available yet — we're putting the finishing touches on Pro. Check back soon.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}