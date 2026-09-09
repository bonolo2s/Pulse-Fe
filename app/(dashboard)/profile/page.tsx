"use client"

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

export default function ProfilePage() {
  const [user, setUser] = useState<JwtPayload | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setUser(decodeToken(token))
    }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>

      <div className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary text-lg font-medium text-primary-foreground">
          {user ? getInitials(user.displayName) : "?"}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-foreground">{user?.displayName}</span>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
      </div>
    </div>
  )
}