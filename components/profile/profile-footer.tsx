import Link from "next/link"
import type { Profile } from "@/lib/types"

type ProfileFooterProps = {
  profile: Profile
}

export const ProfileFooter = ({ profile }: ProfileFooterProps) => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="text-sm text-muted-foreground">
          This profile was created on{" "}
          <Link href="/" className="text-foreground hover:underline">
            UniversalWiki
          </Link>
          , where everyone deserves their own legacy.
        </p>
        <p className="mt-4">
          <Link
            href="/auth/sign-up"
            className="text-sm text-primary hover:underline"
          >
            Create your own profile
          </Link>
        </p>
      </div>
    </footer>
  )
}
