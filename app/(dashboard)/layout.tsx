import { AppShell } from "@/components/app-shell"
import { SubscriptionProvider } from "@/contexts/SubscriptionContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SubscriptionProvider>
      <AppShell>{children}</AppShell>
    </SubscriptionProvider>
  )
}