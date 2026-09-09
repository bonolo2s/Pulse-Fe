"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "./navbar"

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setChecked(true)
    }
  }, [router])

  if (!checked) {
      return (
        <div className="flex h-screen items-center justify-center bg-background">
          <div className="size-6 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
        </div>
      )
    }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}