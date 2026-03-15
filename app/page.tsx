import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
        <h1 className="font-serif text-5xl font-light tracking-tight text-foreground">
          UniversalWiki
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          Your Personal Legacy, Documented
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/auth/sign-up">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
