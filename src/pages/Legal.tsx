import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { Scale, Shield, FileText, ArrowRight, Mail } from "lucide-react";

const Legal = () => {
  const docs = [
    {
      icon: Shield,
      title: "Privacy Policy",
      desc: "Learn how we collect, use, and protect your personal information. We are committed to maintaining the privacy and security of your data.",
      href: "/privacy",
      cta: "Read Privacy Policy",
    },
    {
      icon: FileText,
      title: "Terms of Service",
      desc: "Understand the terms and conditions that govern your use of our website and services. Please review these carefully.",
      href: "/terms",
      cta: "Read Terms of Service",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Policies &amp; Disclaimers</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              LEGAL <span className="text-[#00d9ff]">INFORMATION</span>
            </h1>
            <p className="text-sm text-[#555] max-w-xl mx-auto leading-relaxed">
              Learn about our policies, terms, and how we protect your privacy and data.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {docs.map((d, idx) => (
              <ScrollReveal key={d.href} animation="fade-up" delay={idx * 100}>
                <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 hover:border-[#00d9ff]/30 transition-all h-full flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-10 h-10 rounded border border-[#1a1a1a] flex items-center justify-center mb-4 text-[#00d9ff]">
                      <d.icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-sm font-bold text-white mb-2">{d.title}</h2>
                    <p className="text-sm text-[#555] leading-relaxed">{d.desc}</p>
                  </div>
                  <a
                    href={d.href}
                    className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-[10px] py-3 rounded transition-all flex items-center justify-center gap-1.5"
                  >
                    {d.cta}
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <CyanRule />

          <ScrollReveal animation="scale-in">
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-8 flex flex-col sm:flex-row items-center gap-6 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded border border-[#1a1a1a] flex items-center justify-center text-[#00d9ff] shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <h2 className="font-bebas text-2xl tracking-wide text-white">Questions About Our Policies?</h2>
                <p className="text-sm text-[#555] leading-relaxed">
                  If you have any questions about our privacy practices or terms of service, please don't hesitate to reach out. We're here to help and ensure you understand how we protect and serve our community.
                </p>
                <a
                  href="/contact"
                  className="inline-flex bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-5 py-2.5 rounded transition-all"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Legal;
