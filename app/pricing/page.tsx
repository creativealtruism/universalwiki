import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, Crown } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | UniversalWiki",
  description: "Choose the plan that's right for preserving your legacy",
}

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Start documenting your story",
    features: [
      "1 profile photo",
      "3 biography sections",
      "AI writing assistance",
      "Public profile page",
      "Shareable link",
    ],
    limitations: ["Limited photos", "Limited sections"],
    cta: "Get Started",
    href: "/auth/sign-up",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$9",
    period: "per month",
    description: "The complete legacy experience",
    features: [
      "Unlimited photos",
      "Unlimited biography sections",
      "Priority AI writing assistance",
      "Custom profile themes",
      "Photo galleries",
      "Document uploads",
      "Timeline view",
      "Family tree feature",
      "Priority support",
      "No UniversalWiki branding",
    ],
    limitations: [],
    cta: "Upgrade to Premium",
    href: "/auth/sign-up?plan=premium",
    highlighted: true,
  },
  {
    name: "Lifetime",
    price: "$149",
    period: "one-time",
    description: "Forever preserved",
    features: [
      "Everything in Premium",
      "Pay once, yours forever",
      "Legacy guarantee",
      "Profile archival service",
      "Family member access",
      "Export to PDF/print",
    ],
    limitations: [],
    cta: "Get Lifetime Access",
    href: "/auth/sign-up?plan=lifetime",
    highlighted: false,
  },
]

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl font-light tracking-tight text-foreground md:text-5xl">
              Choose Your Legacy Plan
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every life deserves to be remembered. Select the plan that fits how you want to
              preserve and share your story.
            </p>
          </div>
        </section>

        <section className="pb-20 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              {PLANS.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col ${
                    plan.highlighted
                      ? "border-primary shadow-lg scale-105"
                      : "border-border"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                        <Crown className="h-4 w-4" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className={plan.highlighted ? "pt-8" : ""}>
                    <CardTitle className="font-serif text-2xl font-light">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-light">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`mt-6 w-full ${plan.highlighted ? "" : "variant-outline"}`}
                      variant={plan.highlighted ? "default" : "outline"}
                      asChild
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-muted/30">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-light text-foreground">
              Questions? We have answers.
            </h2>
            <div className="mt-12 space-y-8 text-left">
              <div>
                <h3 className="font-medium text-foreground">What happens to my profile if I cancel?</h3>
                <p className="mt-2 text-muted-foreground">
                  Your profile remains active on the free plan. You keep all your content, but some
                  premium features become view-only until you re-subscribe.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Can I change plans later?</h3>
                <p className="mt-2 text-muted-foreground">
                  Absolutely. You can upgrade, downgrade, or switch to lifetime at any time. We
                  pro-rate any plan changes.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">What is the Legacy Guarantee?</h3>
                <p className="mt-2 text-muted-foreground">
                  For lifetime members, we guarantee your profile will remain accessible for at least
                  50 years, even if UniversalWiki changes ownership or structure.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Is there a free trial for Premium?</h3>
                <p className="mt-2 text-muted-foreground">
                  The free plan is essentially an unlimited trial. You can use all core features
                  forever, and upgrade whenever you are ready for more.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PricingPage
