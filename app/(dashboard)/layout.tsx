"use client"

import { ThemeProvider } from "next-themes"
import { AppShell } from "@/components/app-shell"
import { SubscriptionProvider } from "@/contexts/SubscriptionContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SubscriptionProvider>
        <AppShell>{children}</AppShell>
      </SubscriptionProvider>
    </ThemeProvider>
  )
}