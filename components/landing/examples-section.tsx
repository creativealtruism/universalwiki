import Link from "next/link"
import { ArrowRight } from "lucide-react"

const exampleProfiles = [
  {
    name: "Eleanor Mitchell",
    headline: "Architect, Educator, and Urban Design Pioneer",
    location: "San Francisco, CA",
    excerpt: "A visionary architect who spent four decades reshaping how we think about public spaces and sustainable urban living...",
    sections: ["Early Life", "Education", "Career", "Philosophy", "Legacy"],
    slug: "eleanor-mitchell",
  },
  {
    name: "James Thornton",
    headline: "Marine Biologist and Ocean Conservation Advocate",
    location: "Monterey, CA",
    excerpt: "From childhood summers on the Maine coast to leading international ocean conservation efforts, James dedicated his life to understanding and protecting our seas...",
    sections: ["Early Life", "Research", "Expeditions", "Publications", "Family"],
    slug: "james-thornton",
  },
  {
    name: "Maria Santos",
    headline: "Chef, Restaurateur, and Culinary Historian",
    location: "Chicago, IL",
    excerpt: "The daughter of immigrant parents, Maria built a culinary empire while preserving the traditional recipes and stories that shaped her identity...",
    sections: ["Origins", "Culinary Journey", "Restaurants", "Cookbooks", "Philosophy"],
    slug: "maria-santos",
  },
]

const ExamplesSection = () => {
  return (
    <section id="examples" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Examples
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground text-balance">
            See what stories look like
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore how others have documented their journeys using UniversalWiki.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exampleProfiles.map((profile) => (
            <article
              key={profile.slug}
              className="group bg-background rounded-xl border border-border/50 overflow-hidden hover:border-border hover:shadow-lg transition-all"
            >
              {/* Profile photo placeholder - styled as an elegant portrait frame */}
              <div className="aspect-[4/3] bg-muted/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-muted border-4 border-background/50 flex items-center justify-center">
                    <span className="font-serif text-3xl text-muted-foreground">
                      {profile.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                  {profile.name}
                </h3>
                <p className="text-sm text-primary mt-1">
                  {profile.headline}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {profile.location}
                </p>

                <p className="mt-4 text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {profile.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.sections.slice(0, 3).map((section) => (
                    <span
                      key={section}
                      className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                    >
                      {section}
                    </span>
                  ))}
                  {profile.sections.length > 3 && (
                    <span className="text-xs px-2 py-1 text-muted-foreground">
                      +{profile.sections.length - 3} more
                    </span>
                  )}
                </div>

                <Link
                  href={`/p/${profile.slug}`}
                  className="mt-4 inline-flex items-center text-sm text-primary hover:underline underline-offset-4"
                >
                  Read full profile
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ExamplesSection }
