export type EndpointStatus = "operational" | "degraded" | "downtime"

export interface Endpoint {
  id: string
  name: string
  url: string
  status: EndpointStatus
  uptime: number
  checkInterval: string
  lastChecked: string
  responseTime: number
}

export interface Alert {
  id: string
  endpointId: string
  endpointName: string
  type: "downtime" | "degraded" | "recovery" | "latency"
  message: string
  timestamp: string
  acknowledged: boolean
}

export const endpoints: Endpoint[] = [
  {
    id: "1",
    name: "Staging Environment",
    url: "https://staging.api.acme.com",
    status: "downtime",
    uptime: 85.20,
    checkInterval: "10m",
    lastChecked: "8 minutes ago",
    responseTime: 0,
  },
  {
    id: "2",
    name: "Payment Gateway Webhook",
    url: "https://payments.acme.com/webhook",
    status: "degraded",
    checkInterval: "1m",
    uptime: 98.45,
    lastChecked: "1 minute ago",
    responseTime: 1240,
  },
  {
    id: "3",
    name: "Production API",
    url: "https://api.acme.com/v1/health",
    status: "operational",
    uptime: 99.99,
    checkInterval: "1m",
    lastChecked: "1 minute ago",
    responseTime: 142,
  },
  {
    id: "4",
    name: "Marketing Website",
    url: "https://acme.com",
    status: "operational",
    uptime: 99.95,
    checkInterval: "5m",
    lastChecked: "3 minutes ago",
    responseTime: 320,
  },
  {
    id: "5",
    name: "Legacy Auth Service",
    url: "https://auth.old.acme.com",
    status: "operational",
    uptime: 99.10,
    checkInterval: "15m",
    lastChecked: "12 minutes ago",
    responseTime: 890,
  },
]

export const alerts: Alert[] = [
  {
    id: "a1",
    endpointId: "1",
    endpointName: "Staging Environment",
    type: "downtime",
    message: "Endpoint is unreachable. Connection timed out after 30s.",
    timestamp: "8 minutes ago",
    acknowledged: false,
  },
  {
    id: "a2",
    endpointId: "2",
    endpointName: "Payment Gateway Webhook",
    type: "degraded",
    message: "Response time exceeded 1000ms threshold (avg 1240ms).",
    timestamp: "12 minutes ago",
    acknowledged: false,
  },
  {
    id: "a3",
    endpointId: "3",
    endpointName: "Production API",
    type: "recovery",
    message: "Endpoint recovered after 2m 15s of downtime.",
    timestamp: "1 hour ago",
    acknowledged: true,
  },
  {
    id: "a4",
    endpointId: "4",
    endpointName: "Marketing Website",
    type: "latency",
    message: "Average response time increased by 45% in the last hour.",
    timestamp: "2 hours ago",
    acknowledged: true,
  },
  {
    id: "a5",
    endpointId: "1",
    endpointName: "Staging Environment",
    type: "downtime",
    message: "Endpoint returned HTTP 503 Service Unavailable.",
    timestamp: "3 hours ago",
    acknowledged: true,
  },
  {
    id: "a6",
    endpointId: "5",
    endpointName: "Legacy Auth Service",
    type: "latency",
    message: "Response time exceeded 800ms threshold (avg 890ms).",
    timestamp: "5 hours ago",
    acknowledged: true,
  },
]

export function getStatusCounts(eps: Endpoint[]) {
  const operational = eps.filter((e) => e.status === "operational").length
  const downtime = eps.filter((e) => e.status === "downtime").length
  const degraded = eps.filter((e) => e.status === "degraded").length
  const avgUptime =
    eps.length > 0
      ? eps.reduce((sum, e) => sum + e.uptime, 0) / eps.length
      : 0
  return { total: eps.length, operational, downtime, degraded, avgUptime }
}
