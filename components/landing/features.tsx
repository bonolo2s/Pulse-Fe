import { Globe, Bell, BarChart3, Shield, Clock, Zap } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Global Endpoint Monitoring",
    description: "Monitor HTTP, HTTPS, TCP, and DNS endpoints from multiple regions worldwide with sub-minute check intervals.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Get notified via email, Slack, or webhooks the moment an endpoint goes down or latency spikes.",
  },
  {
    icon: BarChart3,
    title: "Uptime & Latency History",
    description: "Track availability percentages and response time trends over 30, 60, or 90 day windows.",
  },
  {
    icon: Shield,
    title: "SSL Certificate Monitoring",
    description: "Receive advance warnings before your SSL certificates expire so you never get caught off guard.",
  },
  {
    icon: Clock,
    title: "Status Pages",
    description: "Share a public or private status page with your team and customers to build trust and transparency.",
  },
  {
    icon: Zap,
    title: "Fast Check Intervals",
    description: "Checks as frequent as every 30 seconds so you catch issues before they impact your users.",
  },
]

export function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to stay ahead of downtime
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            From real-time monitoring to detailed analytics, Pulse gives your team the tools to keep services reliable.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20 hover:bg-accent/40"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="size-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-card-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
