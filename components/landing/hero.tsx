import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = [
  "No credit card required",
  "5 endpoints free forever",
  "Setup in under 2 minutes",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pt-32">
      {/* Subtle bg decoration */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[480px] w-[960px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        {/* Pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
          <span className="size-2 rounded-full bg-status-operational" />
          <span className="text-xs font-medium text-muted-foreground">
            Trusted by 2,000+ engineering teams
          </span>
        </div>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Know when your APIs go down, before your users do
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Pulse monitors your endpoints around the clock, measures latency, and alerts your team instantly when something breaks.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/register">
            <Button size="lg" className="gap-2 px-8 text-sm">
              Start Monitoring Free <ArrowRight className="size-4" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="px-8 text-sm">
              See How It Works
            </Button>
          </a>
        </div>

        {/* Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {highlights.map((text) => (
            <div key={text} className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-status-operational" />
              <span className="text-xs text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
