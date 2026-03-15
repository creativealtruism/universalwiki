import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

const SignUpSuccessPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border/50 shadow-lg text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="font-serif text-2xl">Check your email</CardTitle>
          <CardDescription className="text-muted-foreground">
            {"We've sent a confirmation link to your email address. Click the link to verify your account and start building your legacy."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {"Didn't receive an email? Check your spam folder or "}
            <Link
              href="/auth/sign-up"
              className="text-primary underline-offset-4 hover:underline"
            >
              try again
            </Link>
          </p>
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

export default SignUpSuccessPage
