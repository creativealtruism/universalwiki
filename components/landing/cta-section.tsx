import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-balance">
            Start documenting your legacy today
          </h2>
          <p className="mt-4 text-lg text-background/70 max-w-xl mx-auto">
            Join thousands of people who are preserving their stories for future generations. Your journey matters.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              className="min-w-[200px] bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/auth/sign-up">
                Create your profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-background/50">
            Free tier includes one profile photo and all core features.
          </p>
        </div>
      </div>
    </section>
  )
}

export { CTASection }
