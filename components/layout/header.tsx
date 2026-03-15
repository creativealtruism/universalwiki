import Link from "next/link"
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight text-foreground">
          UniversalWiki
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="#features" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link 
            href="#examples" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Examples
          </Link>
          <Link 
            href="/pricing" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/sign-up">Get started</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export { Header }
