import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.15),transparent_50%)]" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Your personal legacy platform
          </p>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance">
            Your story deserves to be told beautifully
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
            Create a thoughtfully designed personal biography that captures your journey, achievements, and the moments that matter most. Like Wikipedia, but for your life.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="min-w-[200px]">
              <Link href="/auth/sign-up">
                Start your story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-w-[200px]">
              <Link href="#examples">
                View examples
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Free to start. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}

export { HeroSection }
