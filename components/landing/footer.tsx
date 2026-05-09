import { Activity } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary">
            <Activity className="size-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">Pulse</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
          <a href="#features" className="text-xs text-muted-foreground hover:text-foreground">Features</a>
          <a href="#pricing" className="text-xs text-muted-foreground hover:text-foreground">Pricing</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Documentation</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms</a>
        </nav>
        <p className="text-xs text-muted-foreground">
          {"\u00A9"} 2026 Pulse. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
