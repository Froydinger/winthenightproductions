import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Mail, Clock, Mic, ExternalLink, BookOpen, Send, Check } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("form-name", "contact");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      setSubmitted(true);
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try mailto link.");
    } finally {
      setIsSubmitting(false);
    }
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
            <p className="text-sm text-[#555] max-w-md mx-auto leading-relaxed">
              Have a question, story to share, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left sidebar / contact stats */}
            <div className="md:col-span-4 space-y-4">
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#00d9ff]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Response Time</h3>
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
                  We typically respond within 48 hours. If you haven't heard from us, check your spam folder or reach out again.
                </p>
              </div>

              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-[#00d9ff]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Be Our Guest</h3>
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
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
                <p className="text-xs text-[#555] leading-relaxed">
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
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#00d9ff]/20 text-[#00d9ff] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(0,217,255,0.2)]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h2 className="font-bebas text-3xl text-white tracking-wider">Message Sent!</h2>
                  <p className="text-xs text-[#555] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. We have received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-[#00d9ff] hover:underline uppercase tracking-wider pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-[#555]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-black border border-[#1a1a1a] focus:border-[#00d9ff] rounded px-4 py-3 text-white text-xs outline-none transition-colors placeholder-[#333]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-[#555]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-black border border-[#1a1a1a] focus:border-[#00d9ff] rounded px-4 py-3 text-white text-xs outline-none transition-colors placeholder-[#333]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-[#555]">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-black border border-[#1a1a1a] focus:border-[#00d9ff] rounded px-4 py-3 text-white text-xs outline-none transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Be a Guest">Be a Guest on the Podcast</option>
                      <option value="Feedback">Feedback / Suggestions</option>
                      <option value="Support">Support / Sponsorship</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-[#555]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      rows={6}
                      className="w-full bg-black border border-[#1a1a1a] focus:border-[#00d9ff] rounded px-4 py-3 text-white text-xs outline-none transition-colors placeholder-[#333] resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00d9ff] hover:opacity-90 disabled:opacity-50 text-black font-bold uppercase tracking-wider text-xs py-3.5 rounded flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Contact;
