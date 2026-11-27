import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import InquiryForm from "@/components/InquiryForm";
import { Mail, Clock, Mic, Handshake } from "lucide-react";

const Contact = () => {
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
            <p className="text-sm text-[#555] max-w-md mx-auto leading-relaxed">
              Have a question, story to share, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <section aria-labelledby="sponsorship-heading" className="space-y-5 rounded border border-[#1a1a1a] bg-[#0d0d0d] p-6">
            <div className="space-y-2">
              <h2 id="sponsorship-heading" className="flex items-center gap-2 font-bebas text-2xl tracking-wider text-white">
                <Handshake aria-hidden="true" className="h-5 w-5 shrink-0 text-[#00d9ff]" />
                Want to sponsor Win The Night?
              </h2>
              <p className="text-sm leading-relaxed text-white/75">
                If our conversations about mental health and lived experience feel like a fit for your organization, tell us a little about what you have in mind.
              </p>
            </div>
            <div className="max-w-xl"><InquiryForm kind="sponsorship" /></div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left sidebar / contact stats */}
            <div className="md:col-span-4 space-y-4">
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#00d9ff]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Response Time</h3>
                </div>
                <p className="text-sm text-[#555] leading-relaxed">
                  We typically respond within 48 hours. If you haven't heard from us, check your spam folder or reach out again.
                </p>
              </div>

              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-[#00d9ff]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Be Our Guest</h3>
                </div>
                <p className="text-sm text-[#555] leading-relaxed">
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
                <p className="text-sm text-[#555] leading-relaxed">
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

            {/* Right form column */}
            <div className="md:col-span-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded p-8">
              <h2 className="mb-4 font-bebas text-2xl tracking-wide text-white">Contact the team</h2>
              <InquiryForm kind="contact" />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Contact;
