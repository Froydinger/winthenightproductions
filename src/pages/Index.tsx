import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommunitySection from "@/components/CommunitySection";
import WatchLatestSection from "@/components/WatchLatestSection";
import ShortsCarousel from "@/components/ShortsCarousel";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Blur zones for top and bottom edges */}
      <div className="fixed top-0 left-0 right-0 h-[20vh] z-30 pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
        <div className="absolute inset-0 backdrop-blur-md" style={{ opacity: 0.6, maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', transform: 'translateZ(0)' }} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[20vh] z-30 pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
        <div className="absolute inset-0 backdrop-blur-md" style={{ opacity: 0.6, maskImage: 'linear-gradient(to top, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)', transform: 'translateZ(0)' }} />
      </div>

      {/* Sticky Header */}
      <Header />

      {/* Content Sections */}
      <div className="relative z-10">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="latest-videos">
          <WatchLatestSection />
        </div>
        <div id="shorts">
          <ShortsCarousel />
        </div>
        <div id="features" className="scroll-mt-8">
          <FeaturesSection />
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
