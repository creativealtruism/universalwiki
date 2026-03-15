import Link from "next/link"
import { Button } from "@/components/ui/button"

const ProfileNotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-4xl font-light text-foreground">Profile Not Found</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          This profile either does not exist or has been set to private by its owner.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/sign-up">Create Your Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileNotFound
