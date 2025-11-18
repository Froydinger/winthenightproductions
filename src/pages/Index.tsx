import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommunitySection from "@/components/CommunitySection";
import WatchLatestSection from "@/components/WatchLatestSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useScrollBlur } from "@/hooks/use-scroll-blur";

const ScrollBlurSection = ({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) => {
  const { ref, blurAmount } = useScrollBlur();
  
  return (
    <div
      id={id}
      ref={ref}
      className={className}
      style={{
        filter: `blur(${blurAmount}px)`,
        transition: "filter 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
};

const Index = () => {
  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Sticky Header */}
      <Header />

      {/* Content Sections */}
      <div className="relative z-10">
        <ScrollBlurSection id="hero">
          <HeroSection />
        </ScrollBlurSection>
        <ScrollBlurSection id="features" className="scroll-mt-8">
          <FeaturesSection />
        </ScrollBlurSection>
        <ScrollBlurSection id="community">
          <CommunitySection />
        </ScrollBlurSection>
        <ScrollBlurSection id="watch-latest">
          <WatchLatestSection />
        </ScrollBlurSection>
        <ScrollBlurSection id="cta">
          <CTASection />
        </ScrollBlurSection>
        <Footer />
      </div>
    </main>
  );
};

export default Index;
