import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { ExamplesSection } from "@/components/landing/examples-section"
import { CTASection } from "@/components/landing/cta-section"

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ExamplesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
