import type { ProfileSection as ProfileSectionType } from "@/lib/types"

type ProfileSectionProps = {
  section: ProfileSectionType
}

export const ProfileSection = ({ section }: ProfileSectionProps) => {
  return (
    <section id={section.id} className="scroll-mt-24">
      <h2 className="font-serif text-2xl font-light tracking-tight text-foreground border-b border-border pb-2 mb-4">
        {section.title}
      </h2>
      {section.content && (
        <div className="prose prose-lg max-w-none">
          {section.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-foreground leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
  )
}
