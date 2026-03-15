"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, Crown, Lock } from "lucide-react"

type UpgradeModalProps = {
  trigger?: React.ReactNode
  featureName?: string
}

export const UpgradeModal = ({ trigger, featureName }: UpgradeModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Lock className="h-4 w-4" />
            Upgrade
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-xl font-light">
            <Crown className="h-5 w-5 text-primary" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription>
            {featureName
              ? `Unlock ${featureName} and more with Premium.`
              : "Get unlimited access to all features."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              Unlimited biography sections
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              Unlimited photo uploads
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              Custom profile themes
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              Priority AI writing assistance
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              Document uploads
            </li>
          </ul>

          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-2xl font-light">
              $9<span className="text-sm text-muted-foreground">/month</span>
            </p>
            <p className="text-xs text-muted-foreground">or $149 for lifetime access</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button asChild>
            <Link href="/pricing">View All Plans</Link>
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
