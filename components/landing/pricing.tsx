import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For side projects and personal sites.",
    features: [
      "5 endpoints",
      "5-minute check intervals",
      "Email alerts",
      "24-hour history",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For growing teams that need faster checks.",
    features: [
      "50 endpoints",
      "30-second check intervals",
      "Email, Slack & webhook alerts",
      "90-day history",
      "SSL monitoring",
      "Public status page",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced requirements.",
    features: [
      "Unlimited endpoints",
      "10-second check intervals",
      "All notification channels",
      "1-year history",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
            Pricing
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Start free. Upgrade when your infrastructure demands it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-xl border p-6 sm:p-8",
                plan.featured
                  ? "border-primary bg-card shadow-lg shadow-primary/10"
                  : "border-border bg-card"
              )}
            >
              {plan.featured && (
                <span className="mb-4 inline-block self-start rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-card-foreground">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-card-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-status-operational" />
                    <span className="text-sm text-muted-foreground">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link href="/register" className="mt-8">
                <Button
                  className="w-full"
                  variant={plan.featured ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
