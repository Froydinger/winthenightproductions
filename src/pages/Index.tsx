import { useState, useEffect } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommunitySection from "@/components/CommunitySection";
import ShortsCarousel from "@/components/ShortsCarousel";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Blur zones for top and bottom 20% of screen */}
      {scrolled && (
        <div className="fixed top-0 left-0 right-0 h-[20vh] z-30 pointer-events-none">
          <div className="absolute inset-0 backdrop-blur-lg" style={{ opacity: 0.3, maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }} />
          <div className="absolute inset-0 backdrop-blur-md" style={{ opacity: 0.4, maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)' }} />
          <div className="absolute inset-0 backdrop-blur-sm" style={{ opacity: 0.5, maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' }} />
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 h-[20vh] z-30 pointer-events-none">
        <div className="absolute inset-0 backdrop-blur-lg" style={{ opacity: 0.3, maskImage: 'linear-gradient(to top, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)' }} />
        <div className="absolute inset-0 backdrop-blur-md" style={{ opacity: 0.4, maskImage: 'linear-gradient(to top, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)' }} />
        <div className="absolute inset-0 backdrop-blur-sm" style={{ opacity: 0.5, maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }} />
      </div>

      {/* Sticky Header */}
      <Header />

      {/* Content Sections */}
      <div className="relative z-10">
        <ScrollBlurSection id="hero">
          <HeroSection />
        </ScrollBlurSection>
        <ScrollBlurSection id="latest-videos">
          <WatchLatestSection />
        </ScrollBlurSection>
        <ScrollBlurSection id="features" className="scroll-mt-8">
          <FeaturesSection />
        </ScrollBlurSection>
        <ScrollBlurSection id="community">
          <CommunitySection />
        </ScrollBlurSection>
        <ScrollBlurSection id="shorts">
          <ShortsCarousel />
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
