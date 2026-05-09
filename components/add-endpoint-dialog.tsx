"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Endpoint } from "@/lib/data"

interface AddEndpointDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (endpoint: Endpoint) => void
}

export function AddEndpointDialog({ open, onClose, onAdd }: AddEndpointDialogProps) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [interval, setInterval] = useState("5m")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !url.trim()) return

    const newEndpoint: Endpoint = {
      id: crypto.randomUUID(),
      name: name.trim(),
      url: url.trim(),
      status: "operational",
      uptime: 100,
      checkInterval: interval,
      lastChecked: "Just now",
      responseTime: 0,
    }

    onAdd(newEndpoint)
    setName("")
    setUrl("")
    setInterval("5m")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Endpoint</DialogTitle>
          <DialogDescription>
            Register a new endpoint to start monitoring its availability and latency.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="ep-name">Name</Label>
            <Input
              id="ep-name"
              placeholder="e.g. Production API"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ep-url">URL</Label>
            <Input
              id="ep-url"
              placeholder="https://api.example.com/health"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ep-interval">Check Interval</Label>
            <Select value={interval} onValueChange={setInterval}>
              <SelectTrigger className="w-full" id="ep-interval">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30s">Every 30 seconds</SelectItem>
                <SelectItem value="1m">Every 1 minute</SelectItem>
                <SelectItem value="5m">Every 5 minutes</SelectItem>
                <SelectItem value="10m">Every 10 minutes</SelectItem>
                <SelectItem value="15m">Every 15 minutes</SelectItem>
                <SelectItem value="30m">Every 30 minutes</SelectItem>
                <SelectItem value="1h">Every 1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Endpoint</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
