import { Endpoint as ApiEndpoint } from "./types" // BE-mirrored type
import { Endpoint as UiEndpoint, EndpointStatus } from "@/lib/data" // UI type

function toRelativeTime(dateStr: string | null): string {
  if (!dateStr) return "Never"
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  const hours = Math.floor(minutes / 60)
  return `${hours} hour${hours === 1 ? "" : "s"} ago`
}

function toCheckInterval(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  return `${Math.floor(minutes / 60)}h`
}

function toStatus(status: string | null): EndpointStatus {
  return (status?.toLowerCase() as EndpointStatus) ?? "downtime"
}

function intervalToSeconds(interval: string): number {
  const unit = interval.slice(-1)
  const value = parseInt(interval.slice(0, -1), 10)

  switch (unit) {
    case "s": return value
    case "m": return value * 60
    case "h": return value * 3600
    default: return value
  }
}

export function mapToUiEndpoint(api: ApiEndpoint): UiEndpoint {
  return {
    id: api.id,
    name: api.name,
    url: api.url,
    status: toStatus(api.status),
    uptime: api.uptimePercentage ?? 0,
    checkInterval: toCheckInterval(api.intervalSeconds),
    lastChecked: toRelativeTime(api.lastCheckedAt),
    responseTime: api.latencyMs ?? 0,
  }
}