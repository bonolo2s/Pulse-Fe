"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast, Toaster } from "sonner"

export default function SettingsPage() {
  const [defaultInterval, setDefaultInterval] = useState("5m")
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [slackEnabled, setSlackEnabled] = useState(false)
  const [email, setEmail] = useState("team@acme.com")
  const [slackWebhook, setSlackWebhook] = useState("")
  const [alertOnDown, setAlertOnDown] = useState(true)
  const [alertOnDegraded, setAlertOnDegraded] = useState(true)
  const [alertOnRecovery, setAlertOnRecovery] = useState(false)
  const [timeoutVal, setTimeoutVal] = useState("30")

  function handleSave() {
    toast.success("Settings saved", {
      description: "Your monitoring preferences have been updated.",
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <Toaster />
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure your monitoring preferences and notification channels.
        </p>
      </div>

      {/* General Settings */}
      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-foreground">General</h2>
        <div className="rounded-xl border bg-card p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="default-interval">Default Check Interval</Label>
              <Select value={defaultInterval} onValueChange={setDefaultInterval}>
                <SelectTrigger className="w-full" id="default-interval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30s">Every 30 seconds</SelectItem>
                  <SelectItem value="1m">Every 1 minute</SelectItem>
                  <SelectItem value="5m">Every 5 minutes</SelectItem>
                  <SelectItem value="10m">Every 10 minutes</SelectItem>
                  <SelectItem value="15m">Every 15 minutes</SelectItem>
                  <SelectItem value="30m">Every 30 minutes</SelectItem>
                  <SelectItem value="1h">Every 1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="timeout">Request Timeout (seconds)</Label>
              <Input
                id="timeout"
                type="number"
                min="5"
                max="120"
                value={timeoutVal}
                onChange={(e) => setTimeoutVal(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Notifications */}
      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-card-foreground">Email Notifications</span>
                <span className="text-xs text-muted-foreground">
                  Receive alerts via email when endpoints go down.
                </span>
              </div>
              <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
            </div>
            {emailEnabled && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="email-address">Email Address</Label>
                <Input
                  id="email-address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            <Separator />

            {/* Slack */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-card-foreground">Slack Notifications</span>
                <span className="text-xs text-muted-foreground">
                  Send alert messages to a Slack channel via webhook.
                </span>
              </div>
              <Switch checked={slackEnabled} onCheckedChange={setSlackEnabled} />
            </div>
            {slackEnabled && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                <Input
                  id="slack-webhook"
                  type="url"
                  placeholder="https://hooks.slack.com/services/..."
                  value={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <Separator />

      {/* Alert Triggers */}
      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-foreground">Alert Triggers</h2>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-card-foreground">Downtime Alerts</span>
                <span className="text-xs text-muted-foreground">
                  Alert when an endpoint becomes unreachable.
                </span>
              </div>
              <Switch checked={alertOnDown} onCheckedChange={setAlertOnDown} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-card-foreground">Degradation Alerts</span>
                <span className="text-xs text-muted-foreground">
                  Alert when response time exceeds the threshold.
                </span>
              </div>
              <Switch checked={alertOnDegraded} onCheckedChange={setAlertOnDegraded} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-card-foreground">Recovery Alerts</span>
                <span className="text-xs text-muted-foreground">
                  Alert when an endpoint recovers from downtime.
                </span>
              </div>
              <Switch checked={alertOnRecovery} onCheckedChange={setAlertOnRecovery} />
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-8">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
