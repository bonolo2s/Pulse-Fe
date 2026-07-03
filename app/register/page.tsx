"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Activity, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/lib"

const perks = [
  "5 endpoints monitored free",
  "30-second minimum check intervals",
  "Email & Slack alerts included",
]

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")//
  const [email, setEmail] = useState("")//
  const [password, setPassword] = useState("")//
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    console.log("Form submitted with:", { name, email, password })
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await register({ fullName: name, email, password })
      if (response.error) {
        setError(response.message)
        return
      }
      router.push("/login")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Left panel - branding (desktop) */}
      <div className="hidden flex-col justify-between bg-primary p-10 lg:flex lg:w-[480px]">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary-foreground/20">
            <Activity className="size-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-primary-foreground">Pulse</span>
        </Link>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold leading-snug text-primary-foreground">
            Monitor your entire stack in one place
          </h2>
          <ul className="flex flex-col gap-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-primary-foreground/40">
          {"\u00A9"} 2026 Pulse. All rights reserved.
        </p>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex h-16 items-center border-b border-border px-4 sm:px-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Pulse</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-1 text-center lg:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Create your account</h1>
              <p className="text-sm text-muted-foreground">
                Start monitoring in under 2 minutes
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="mt-1 w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground lg:text-left">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-foreground hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}