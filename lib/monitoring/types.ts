export type Endpoint = {
  id: string
  userId: string
  name: string
  url: string
  method: string
  intervalSeconds: number
  timeoutMs: number
  isActive: boolean
  createdAt: string
  status: string | null
  latencyMs: number | null
  lastCheckedAt: string | null
  uptimePercentage: number | null
}

export type AddEndpointRequest = {
  userId: string
  name: string
  url: string
  method: string
  intervalSeconds: number
  timeoutMs: number
}