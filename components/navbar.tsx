"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { decodeToken, getInitials } from "@/lib/identity/utils"
import { JwtPayload } from "@/lib/identity/types"
import { DemoNoticeModal } from "@/components/DemoNoticeModal"

const isLive = process.env.NEXT_PUBLIC_USE_LIVE_API === "true"

export function Navbar() {
  const [user, setUser] = useState<JwtPayload | null>(null)
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setUser(decodeToken(token))
    }
  }, [])

  return (
    <header className="flex h-16 items-center justify-end border-b border-border px-8">
      {isLive ? (
        <Link
          href="/profile"
          className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
        >
          {user ? getInitials(user.displayName) : "?"}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setShowNotice(true)}
          className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
        >
          {user ? getInitials(user.displayName) : "?"}
        </button>
      )}

      <DemoNoticeModal open={showNotice} onClose={() => setShowNotice(false)} />
    </header>
  )
}