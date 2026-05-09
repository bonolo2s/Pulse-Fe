const steps = [
  {
    step: "01",
    title: "Add your endpoints",
    description: "Paste the URL of any API, website, or webhook. Choose check intervals from 30 seconds to 1 hour.",
  },
  {
    step: "02",
    title: "We monitor around the clock",
    description: "Pulse sends requests from global regions, records response codes, latency, and SSL status continuously.",
  },
  {
    step: "03",
    title: "Get alerted instantly",
    description: "When something breaks, your team is notified via email, Slack, or webhook within seconds.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/40 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
            How It Works
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Up and running in minutes, not days
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((item, i) => (
            <div key={item.step} className="relative flex flex-col gap-3">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute left-[calc(100%+0.5rem)] top-5 hidden h-px w-[calc(100%-1rem)] bg-border sm:block" aria-hidden="true" />
              )}
              <span className="text-3xl font-bold text-primary/20">{item.step}</span>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
