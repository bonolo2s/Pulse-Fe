"use client"

import { useState, useEffect } from "react"
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
import { intervalToSeconds, mapToUiEndpoint, addEndpoint, updateEndpoint } from "@/lib"
import { Zap } from "lucide-react"

const useLive = process.env.NEXT_PUBLIC_USE_LIVE_API === "true"
const DEMO_ENDPOINT_LIMIT = 3

interface AddEndpointDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (endpoint: Endpoint) => void
  mode?: "add" | "edit"
  endpoint?: Endpoint
  onLimitReached: () => void
  endpointCount: number
}

export function AddEndpointDialog({ open, onClose, onAdd, mode = "add", endpoint, onLimitReached, endpointCount }: AddEndpointDialogProps) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [interval, setInterval] = useState("5m")
  const [method, setMethod] = useState("HTTPS")
  const [timeoutMs, setTimeoutMs] = useState("5000")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  useEffect(() => {
    if (mode === "edit" && endpoint) {
      setName(endpoint.name)
      setUrl(endpoint.url)
      setMethod(endpoint.method)
      setTimeoutMs(String(endpoint.timeoutMs))
      setInterval(endpoint.checkInterval)
    } else if (mode === "add") {
      setName("")
      setUrl("")
      setMethod("HTTPS")
      setTimeoutMs("5000")
      setInterval("5m")
    }
  }, [mode, endpoint?.id, open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !url.trim()) return

    if (mode === "edit" && endpoint) {
      if (!useLive) {
        onAdd({
          ...endpoint,
          name: name.trim(),
          url: url.trim(),
          method,
          checkInterval: interval,
          timeoutMs: Number(timeoutMs) || 5000,
        })
        onClose()
        return
      }

      const response = await updateEndpoint(endpoint.id, {
        name: name.trim(),
        url: url.trim(),
        method,
        intervalSeconds: intervalToSeconds(interval),
        timeoutMs: Number(timeoutMs) || 5000,
      })

      if (response.error) return

      onAdd(mapToUiEndpoint(response.result))
      onClose()
      return
    }

    if (!useLive) {
      if (endpointCount >= DEMO_ENDPOINT_LIMIT) {
        setErrorMessage("You've reached the demo limit of 3 endpoints.")
        return
      }

      onAdd({
        id: crypto.randomUUID(),
        name: name.trim(),
        url: url.trim(),
        status: "operational",
        uptime: 100,
        checkInterval: interval,
        lastChecked: "Just now",
        responseTime: 0,
        isActive: true,
        method,
        timeoutMs: Number(timeoutMs) || 5000,
      })
      setName("")
      setUrl("")
      setInterval("5m")
      setMethod("HTTPS")
      setTimeoutMs("5000")
      onClose()
      return
    }

    const userId = localStorage.getItem("userId")
    if (!userId) return

    const response = await addEndpoint({
      userId,
      name: name.trim(),
      url: url.trim(),
      method,
      intervalSeconds: intervalToSeconds(interval),
      timeoutMs: Number(timeoutMs) || 5000,
    })

    if (response.error) {
      setErrorMessage(response.message)
      //setError(true)
      return
    }

    onAdd(mapToUiEndpoint(response.result))
    setName("")
    setUrl("")
    setInterval("5m")
    setMethod("HTTPS")
    setTimeoutMs("5000")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Endpoint" : "Add Endpoint"}</DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update this endpoint's monitoring configuration."
              : "Register a new endpoint to start monitoring its availability and latency."}
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
            <Label htmlFor="ep-method">Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-full" id="ep-method">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HTTP">HTTP</SelectItem>
                <SelectItem value="HTTPS">HTTPS</SelectItem>
                <SelectItem value="TCP">TCP</SelectItem>
                <SelectItem value="DNS">DNS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ep-timeout">Timeout (ms)</Label>
            <Input
              id="ep-timeout"
              type="number"
              placeholder="5000"
              value={timeoutMs}
              onChange={(e) => setTimeoutMs(e.target.value)}
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
                <SelectItem value="3m">Every 3 minutes</SelectItem>
                <SelectItem value="5m">Every 5 minutes</SelectItem>
                <SelectItem value="10m">Every 10 minutes</SelectItem>
                <SelectItem value="15m">Every 15 minutes</SelectItem>
                <SelectItem value="30m">Every 30 minutes</SelectItem>
                <SelectItem value="1h">Every 1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )} */}
          {errorMessage && (
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-destructive">{errorMessage}</p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  onClose()
                  onLimitReached()
                }}
              >
                <Zap className="size-4" />
                Upgrade to Pro
              </Button>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{mode === "edit" ? "Save Changes" : "Add Endpoint"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}