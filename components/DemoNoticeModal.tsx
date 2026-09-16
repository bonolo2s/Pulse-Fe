"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface DemoNoticeModalProps {
  open: boolean
  onClose: () => void
  variant?: "locked" | "upgrade"
}

export function DemoNoticeModal({ open, onClose, variant = "locked" }: DemoNoticeModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-4 text-primary" />
            </div>
            <DialogTitle>
              {variant === "locked" ? "Not available in this demo" : "Upgrade to Pro"}
            </DialogTitle>
          </div>
          <DialogDescription>
            This part of Pulse is kept offline here to keep infra costs down for a public demo —
            the backend, billing, and infra behind it are fully built.
            <br />
            <br />
            Initial plan was to rate limit at the platform level (API Gateway/app), 
            but this only guards user requests — my health-check pipeline (Lambda + EventBridge → SNS → SQS) 
            polls the database on its own schedule, independent of any demo traffic. 
            <br />
            <br />
            Want to see it running live?
            Reach out and I'll walk you through it.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}