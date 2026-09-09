"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface JwtPayload {
  sub: string
  email: string
  displayName: string
  exp: number
}

function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

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