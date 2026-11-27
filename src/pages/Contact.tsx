import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import InquiryForm from "@/components/InquiryForm";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Clock, Mic, Handshake } from "lucide-react";
import type { InquiryKind } from "@/lib/inquiry";

const choices = [
  { kind: "contact", label: "General inquiry", description: "Ask a question, share feedback, or just say hello.", icon: Mail },
  { kind: "sponsorship", label: "Sponsorship", description: "Talk with us about sponsoring Win The Night.", icon: Handshake },
] as const;

const Contact = () => {
  const [kind, setKind] = useState<InquiryKind | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  useEffect(() => {
    if (interacted.current) heading.current?.focus();
  }, [kind]);

  const select = (next: InquiryKind | null) => {
    interacted.current = true;
    setKind(next);
  };
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Contact Us</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              GET IN <span className="text-[#00d9ff]">TOUCH</span>
            </h1>
            <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              Have a question, story to share, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <section aria-labelledby="inquiry-heading" className="space-y-5 rounded border border-[#1a1a1a] bg-[#0d0d0d] p-5 sm:p-8">
            <h2 ref={heading} id="inquiry-heading" tabIndex={-1} className="font-bebas text-3xl tracking-wider text-white">
              {kind === "sponsorship" ? "Want to sponsor Win The Night?" : kind === "contact" ? "Contact the team" : "What are you reaching out about?"}
            </h2>
            {!kind ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {choices.map(({ kind: option, label, description, icon: Icon }) => (
                  <button
                    key={option}
                    id={option === "sponsorship" ? "sponsorship-heading" : undefined}
                    type="button"
                    onClick={() => select(option)}
                    className="group flex scroll-mt-28 items-start gap-3 rounded border border-white/20 p-4 text-left hover:border-[#00d9ff] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d9ff]"
                  >
                    <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#00d9ff]" />
                    <span className="flex-1 space-y-1">
                      <span className="block text-sm font-semibold text-white">{label}</span>
                      <span className="block text-sm leading-snug text-white/75">{description}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/70 group-hover:text-[#00d9ff]" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="max-w-xl">
                <InquiryForm key={kind} kind={kind} onExit={() => select(null)} exitLabel="Choose another form" />
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#00d9ff]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Response Time</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                We typically respond within 48 hours. If you haven't heard from us, check your spam folder or reach out again.
              </p>
            </div>

            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-[#00d9ff]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Be Our Guest</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Interested in sharing your story on the podcast?{" "}
                <a href="/guest" className="text-[#00d9ff] underline underline-offset-4 hover:opacity-85">
                  Visit our guest page
                </a>{" "}
                for details.
              </p>
            </div>

            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#00d9ff]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Direct Email</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                You can also email us directly at:
              </p>
              <a
                href="mailto:contact@winthenight.org"
                className="block text-xs font-bold text-[#00d9ff] hover:underline"
              >
                contact@winthenight.org
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Contact;
