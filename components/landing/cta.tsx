import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="bg-primary px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Stop guessing. Start monitoring.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
          Join thousands of teams who rely on Pulse to keep their services running. Get started in under 2 minutes.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2 px-8 text-sm">
              Create Free Account <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="ghost" className="px-8 text-sm text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
