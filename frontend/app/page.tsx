import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Effects */}
      <BackgroundEffects />

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
