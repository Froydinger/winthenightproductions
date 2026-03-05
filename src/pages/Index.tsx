import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommunitySection from "@/components/CommunitySection";
import WatchLatestSection from "@/components/WatchLatestSection";
import CTASection from "@/components/CTASection";
import HomeShortsSection from "@/components/HomeShortsSection";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

const Index = () => {
  const isMobile = useIsMobile();
  const [showBackground, setShowBackground] = useState(false);

  // Defer AnimatedBackground until after LCP
  useEffect(() => {
    // Wait for the page to load before showing animations
    const timer = setTimeout(() => {
      setShowBackground(true);
    }, 100); // Show after initial render
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background - deferred for LCP optimization */}
      <div className="fixed inset-0 z-0">
        {showBackground ? (
          <AnimatedBackground />
        ) : (
          // Static background for initial load
          <div className="absolute inset-0 bg-gradient-to-br from-background via-charcoal to-background" />
        )}
      </div>


      {/* Blur zones - removed on mobile for performance, simplified on desktop */}
      {!isMobile && (
        <>
          <div className="fixed top-0 left-0 right-0 h-[20vh] z-30 pointer-events-none">
            <div
              className="absolute inset-0 backdrop-blur-md"
              style={{
                opacity: 0.6,
                maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
              }}
            />
          </div>
          <div className="fixed bottom-0 left-0 right-0 h-[20vh] z-30 pointer-events-none">
            <div
              className="absolute inset-0 backdrop-blur-md"
              style={{
                opacity: 0.6,
                maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
              }}
            />
          </div>
        </>
      )}

      {/* Sticky Header */}
      <Header />

      {/* Content Sections */}
      <div className="relative z-10">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="features" className="scroll-mt-8">
          <FeaturesSection />
        </div>
        <div id="latest-videos">
          <WatchLatestSection />
        </div>
        <div id="community">
          <CommunitySection />
        </div>
        <div id="cta">
          <CTASection />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Index;
