import { Youtube, ExternalLink, Instagram, Facebook, Heart, BookOpen, Radio, Play, Mic, Info, LifeBuoy, Mail, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/win-the-night-logo.webp";
import { ContactDialog } from "@/components/ContactDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className="relative border-t border-neon-blue/20 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <img
              src={logo}
              alt="Win The Night"
              className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(0,217,255,0.4)]"
              loading="lazy"
              decoding="async"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-thin">
              One <span className="font-bold">Connection.</span> One <span className="font-bold">Story.</span> One <span className="font-bold">Conversation</span> at a Time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <a
                href="/watch"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <Play className="w-4 h-4 group-hover:text-neon-blue transition-colors" />
                <span>Watch Episodes</span>
              </a>
              <a
                href="/guest"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <Mic className="w-4 h-4 group-hover:text-neon-blue transition-colors" />
                <span>Be Our Guest!</span>
              </a>
              <a
                href="/about"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <Info className="w-4 h-4 group-hover:text-neon-blue transition-colors" />
                <span>About Us</span>
              </a>
              <a
                href="/contact"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <Mail className="w-4 h-4 group-hover:text-neon-blue transition-colors" />
                <span>Contact</span>
              </a>
              <Link
                to="/support"
                className="text-muted-foreground hover:text-neon-purple transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <Coffee className="w-4 h-4 group-hover:text-neon-purple transition-colors" />
                <span>Support Us</span>
              </Link>
              <a
                href="/blog"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <BookOpen className="w-4 h-4 group-hover:text-neon-blue transition-colors" />
                <span>Blog</span>
              </a>
              <Link
                to="/crisis-resources"
                className="text-red-500 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <LifeBuoy className="w-4 h-4 transition-colors" />
                <span>Crisis Resources</span>
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Connect</h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://youtube.com/@winthenight?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-neon-blue/20 border-2 border-neon-blue/40 text-neon-blue hover:bg-neon-blue/30 hover:border-neon-blue transition-all duration-300 hover:scale-105 group shadow-[0_0_15px_rgba(0,217,255,0.1)] hover:shadow-[0_0_25px_rgba(0,217,255,0.2)]"
              >
                <Youtube className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">Subscribe on YouTube</span>
              </a>
              <Button
                onClick={() => setContactOpen(true)}
                variant="outline"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-neon-blue/40 text-neon-blue hover:bg-neon-blue hover:text-white hover:border-neon-blue transition-all duration-300 hover:scale-105 group"
              >
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">Contact Us</span>
              </Button>
              <Link to="/support">
                <Button
                  variant="outline"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-neon-purple/40 text-neon-purple hover:bg-neon-purple hover:text-white hover:border-neon-purple transition-all duration-300 hover:scale-105 group"
                >
                  <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold">Support Us</span>
                </Button>
              </Link>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://instagram.com/win_the_night"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background/80 border-2 border-border/30 text-[#E1306C] hover:border-[#E1306C]/60 hover:bg-[#E1306C]/10 transition-all duration-300 hover:scale-110 group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="https://tiktok.com/@winthenightpod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background/80 border-2 border-border/30 text-foreground hover:border-foreground/60 hover:bg-foreground/10 transition-all duration-300 hover:scale-110 group"
                  aria-label="Follow us on TikTok"
                >
                  <svg 
                    className="w-6 h-6 group-hover:rotate-12 transition-transform" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100092673610697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background/80 border-2 border-border/30 text-[#1877F2] hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10 transition-all duration-300 hover:scale-110 group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="https://winthenight.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background/80 border-2 border-border/30 text-[#FF6719] hover:border-[#FF6719]/60 hover:bg-[#FF6719]/10 transition-all duration-300 hover:scale-110 group"
                  aria-label="Read our Substack"
                >
                  <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            ©{currentYear} Win The Night Productions™ •{" "}
            <a
              href="https://froydinger.link/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neon-blue transition-colors duration-300"
            >
              Froydinger Media™
            </a>
          </p>
          <p className="text-xs">
            A mental health community built on real conversations
          </p>
        </div>
      </div>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </footer>
  );
};

export default Footer;
