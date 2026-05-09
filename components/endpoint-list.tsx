"use client"

import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/status-badge"
import type { Endpoint } from "@/lib/data"
import { EndpointDetail } from "@/components/endpoint-detail"

export function EndpointList({ endpoints }: { endpoints: Endpoint[] }) {
  const [search, setSearch] = useState("")
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null)

  const filtered = endpoints.filter(
    (ep) =>
      ep.name.toLowerCase().includes(search.toLowerCase()) ||
      ep.url.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Monitored Services</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search endpoints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-card"
            />
          </div>
        </div>

        <div className="rounded-xl border bg-card">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              No endpoints found.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((endpoint) => (
                <li key={endpoint.id}>
                  <button
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
                  >
                    <div className="w-[120px] shrink-0">
                      <StatusBadge status={endpoint.status} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-sm font-semibold text-card-foreground">
                        {endpoint.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground font-mono">
                        {endpoint.url}
                        <span className="ml-2 font-sans">
                          {"  "}
                          {"  \u00B7  "}
                          Checks every {endpoint.checkInterval}
                        </span>
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-6 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-card-foreground">
                          {endpoint.uptime.toFixed(2)}%
                        </span>
                        <span className="text-[11px] text-muted-foreground">Uptime</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-card-foreground">
                          {endpoint.lastChecked}
                        </span>
                        <span className="text-[11px] text-muted-foreground">Last checked</span>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground/50" />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <EndpointDetail
        endpoint={selectedEndpoint}
        open={!!selectedEndpoint}
        onClose={() => setSelectedEndpoint(null)}
      />
    </>
  )
}
