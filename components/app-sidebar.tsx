"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, LayoutDashboard, Bell, Settings, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Alerts", href: "/alerts", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-60 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <Activity className="size-4 text-sidebar-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-sidebar-primary-foreground">Pulse</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-2">
        <p className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted">
          Menu
        </p>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="size-[18px]" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-sidebar-foreground">
          <CheckCircle2 className="size-3.5 text-status-operational" />
          <span>All Systems Operational</span>
        </div>
      </div>
    </aside>
  )
}
