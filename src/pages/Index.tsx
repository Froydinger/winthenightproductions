import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommunitySection from "@/components/CommunitySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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
        <div id="hero">
          <HeroSection />
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
