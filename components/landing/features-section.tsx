import { BookOpen, Camera, Globe, Lock, Sparkles, Users } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Structured Storytelling",
    description: "Organize your life into meaningful sections—early life, career, achievements, philosophy—just like a Wikipedia article.",
  },
  {
    icon: Camera,
    title: "Rich Media Support",
    description: "Upload photos, documents, and memories. Each image tells part of your story and becomes part of your archive.",
  },
  {
    icon: Globe,
    title: "Share Your Legacy",
    description: "Generate a beautiful public profile URL to share with family, friends, or the world. Your story, accessible anywhere.",
  },
  {
    icon: Lock,
    title: "Privacy Controls",
    description: "Choose what to share. Keep sections private, share with select people, or make your entire profile public.",
  },
  {
    icon: Sparkles,
    title: "Editorial Design",
    description: "Clean, elegant typography and layouts inspired by the world's finest publications and archives.",
  },
  {
    icon: Users,
    title: "Family Archives",
    description: "Create profiles for family members. Build a connected archive that tells your family's complete story.",
  },
]

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Features
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground text-balance">
            Everything you need to tell your story
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A thoughtfully designed platform that makes documenting your life simple and beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background rounded-xl p-6 border border-border/50 hover:border-border transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeaturesSection }
