"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { decodeToken, getInitials } from "@/lib/identity/utils"
import { JwtPayload } from "@/lib/identity/types"

export function Navbar() {
  const [user, setUser] = useState<JwtPayload | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setUser(decodeToken(token))
    }
  }, [])

  return (
    <header className="flex h-16 items-center justify-end border-b border-border px-8">
      <Link
        href="/profile"
        className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
      >
        {user ? getInitials(user.displayName) : "?"}
      </Link>
    </header>
  )
}