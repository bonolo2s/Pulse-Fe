"use client"

import { useEffect, useState } from "react"
import { decodeToken, getInitials } from "@/lib/identity/utils"
import { JwtPayload } from "@/lib/identity/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Construction } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<JwtPayload | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setUser(decodeToken(token))
    }
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Your account details.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary text-lg font-medium text-primary-foreground">
              {user ? getInitials(user.displayName) : "?"}
            </div>
            <div className="flex flex-col gap-0.5">
              <CardTitle className="text-lg">{user?.displayName ?? "—"}</CardTitle>
              <CardDescription>{user?.email ?? "—"}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-accent/30 px-4 py-3">
            <Construction className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Profile customization is coming soon.
            </span>
            <Badge variant="secondary" className="ml-auto">
              Coming Soon
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}