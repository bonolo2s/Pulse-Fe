"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Receipt, Download, Plus, Check, Trash2 } from "lucide-react"
import { UpgradeModal } from "@/components/UpgradeModal"
import { Subscription, getSubscription, getEndpointCount } from "@/lib"

// ---- mock data, swap with real API later ----
const currentPlan = {
  name: "Free",
  price: "$0",
  endpointsUsed: 3,
  endpointsLimit: 3,
}

const paymentMethods = [
  { id: "1", brand: "Visa", last4: "4242", expiry: "04/27", isDefault: true },
  { id: "2", brand: "Mastercard", last4: "8821", expiry: "11/26", isDefault: false },
]

const invoices = [
  { id: "INV-1042", date: "Aug 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-1031", date: "Jul 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-1019", date: "Jun 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-1005", date: "May 1, 2026", amount: "$29.00", status: "Failed" },
]

export default function BillingPage() {
  const [tab, setTab] = useState("subscription")
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [endpointCount, setEndpointCount] = useState<number>(0)
  const [loadingSubscription, setLoadingSubscription] = useState(true)
  const [manageOpen, setManageOpen] = useState(false)

  useEffect(() => {
  async function fetchSubscriptionData() {
    const userId = localStorage.getItem("userId")
    if (!userId) return

    setLoadingSubscription(true)
    const [subRes, countRes] = await Promise.all([
      getSubscription(userId),
      getEndpointCount(userId),
    ])

    if (!subRes.error) setSubscription(subRes.result)
    if (!countRes.error) setEndpointCount(countRes.result)
    setLoadingSubscription(false)
  }

  fetchSubscriptionData()
}, [])


  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription, payment methods, and invoices.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-muted">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>

        {/* Subscription */}
        <TabsContent value="subscription" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your active subscription and usage.</CardDescription>
                </div>
                {subscription && <Badge variant="secondary">{subscription.plan}</Badge>}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {loadingSubscription ? (
                <p className="text-sm text-muted-foreground">Loading subscription...</p>
              ) : !subscription ? (
                <p className="text-sm text-muted-foreground">Could not load subscription.</p>
              ) : (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">
                      ${subscription.monthlyPrice}
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Endpoints used</span>
                      <span className="font-medium text-foreground">
                        {subscription.plan === "Pro"
                          ? `${endpointCount} / Unlimited`
                          : `${endpointCount} / ${subscription.endpointLimit}`}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-foreground"
                        style={{
                          width:
                            subscription.plan === "Pro"
                              ? "100%"
                              : `${(endpointCount / subscription.endpointLimit) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {subscription.plan === "Pro" ? (
                      <Button variant="outline" className="gap-2" onClick={() => setManageOpen(true)}>
                        Manage Subscription
                      </Button>
                    ) : (
                      <Button className="gap-2" onClick={() => setUpgradeOpen(true)}>
                        <Check className="size-4" />
                        Upgrade to Pro
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods */}
        <TabsContent value="payment" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Cards saved to your account.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="size-4" />
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {paymentMethods.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                  <CreditCard className="size-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No payment methods saved yet.</p>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {paymentMethods.map((pm) => (
                    <li key={pm.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <CreditCard className="size-5 text-muted-foreground" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {pm.brand} •••• {pm.last4}
                          </span>
                          <span className="text-xs text-muted-foreground">Expires {pm.expiry}</span>
                        </div>
                        {pm.isDefault && (
                          <Badge variant="secondary" className="text-[11px]">
                            Default
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing History */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Past invoices and receipts.</CardDescription>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                  <Receipt className="size-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No invoices yet.</p>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {invoices.map((inv) => (
                    <li key={inv.id} className="flex items-center justify-between py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{inv.id}</span>
                        <span className="text-xs text-muted-foreground">{inv.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-foreground">{inv.amount}</span>
                        <Badge variant="secondary">{inv.status}</Badge>
                        <Button variant="ghost" size="icon">
                          <Download className="size-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </div>
  )
}