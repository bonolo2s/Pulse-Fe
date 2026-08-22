"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { Subscription, getSubscription, cancelSubscription } from "@/lib"

interface SubscriptionContextValue {
  subscription: Subscription | null
  loading: boolean
  refetch: () => Promise<void>
  cancel: () => Promise<{ error: boolean }>
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(async () => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      setLoading(false)
      return
    }

    setLoading(true)
    const res = await getSubscription(userId)
    if (!res.error) setSubscription(res.result)
    setLoading(false)
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  async function cancel() {
    const userId = localStorage.getItem("userId")
    if (!userId) return { error: true }

    const res = await cancelSubscription(userId)
    if (!res.error) await refetch()
    return res
  }

  return (
    <SubscriptionContext.Provider value={{ subscription, loading, refetch, cancel }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext)
  if (!ctx) throw new Error("useSubscription must be used within a SubscriptionProvider")
  return ctx
}