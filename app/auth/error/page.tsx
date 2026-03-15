import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

const AuthErrorPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border/50 shadow-lg text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="font-serif text-2xl">Authentication Error</CardTitle>
          <CardDescription className="text-muted-foreground">
            Something went wrong during the authentication process. This could be due to an expired or invalid link.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/auth/login">Try signing in again</Link>
          </Button>
          <Link
            href="/"
            className="inline-block text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Return to homepage
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}

export default AuthErrorPage
