"use client"

import { useEffect, useState } from "react"
import { decodeToken, getInitials } from "@/lib/identity/utils"
import { JwtPayload } from "@/lib/identity/types"

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
          <h1 className="text-xl font-bold text-foreground">Coming Soon</h1>
        </div>
      </div>
    </div>
  )
}