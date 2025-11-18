import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommunitySection from "@/components/CommunitySection";
import WatchLatestSection from "@/components/WatchLatestSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Blur zones for top and bottom 20% of screen */}
      <div className="fixed top-0 left-0 right-0 h-[20vh] z-30 pointer-events-none backdrop-blur-sm" 
           style={{ 
             maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
           }} 
      />
      <div className="fixed bottom-0 left-0 right-0 h-[20vh] z-30 pointer-events-none backdrop-blur-sm" 
           style={{ 
             maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
             WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
           }} 
      />

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
        <div id="community">
          <CommunitySection />
        </div>
        <div id="watch-latest">
          <WatchLatestSection />
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
