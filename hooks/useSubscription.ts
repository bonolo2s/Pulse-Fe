"use client"

import { useState, useEffect, useCallback } from "react"
import { Subscription, getSubscription, cancelSubscription } from "@/lib"

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(async () => {
    const userId = localStorage.getItem("userId")
    if (!userId) return

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

  return { subscription, loading, refetch, cancel }
}