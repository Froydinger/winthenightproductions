import {
  Youtube,
  ExternalLink,
  Instagram,
  Facebook,
  Heart,
  BookOpen,
  Radio,
  Play,
  Mic,
  Info,
  LifeBuoy,
  Mail,
  Coffee,
  Scale,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/win-the-night-logo.png";
import { ContactDialog } from "@/components/ContactDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className="relative z-10 bg-black border-t border-[#1a1a1a] py-12 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#111]">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Win The Night"
              className="w-12 h-12 object-contain rounded-full drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]"
              loading="lazy"
              decoding="async"
            />
            <div>
              <div className="font-bebas text-2xl tracking-wider text-white">
                WIN THE <span className="text-[#00d9ff]">NIGHT</span>
              </div>
              <div className="text-[0.65rem] tracking-[0.12em] uppercase text-[#555] font-medium font-sans">
                Mental Health Community
              </div>
            </div>
          </div>

          <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 list-none">
            <li>
              <a href="/watch" className="text-xs font-semibold uppercase tracking-wider text-[#555] hover:text-white transition-colors duration-200">
                Watch
              </a>
            </li>
            <li>
              <a href="/listen" className="text-xs font-semibold uppercase tracking-wider text-[#555] hover:text-white transition-colors duration-200">
                Listen
              </a>
            </li>
            <li>
              <a href="/blog" className="text-xs font-semibold uppercase tracking-wider text-[#555] hover:text-white transition-colors duration-200">
                Blog
              </a>
            </li>
            <li>
              <a href="/about" className="text-xs font-semibold uppercase tracking-wider text-[#555] hover:text-white transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a href="/support" className="text-xs font-semibold uppercase tracking-wider text-[#555] hover:text-white transition-colors duration-200">
                Support
              </a>
            </li>
            <li>
              <a href="/crisis-resources" className="text-xs font-semibold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors duration-200">
                Crisis
              </a>
            </li>
            <li>
              <a href="/legal" className="text-xs font-semibold uppercase tracking-wider text-[#555] hover:text-white transition-colors duration-200">
                Legal
              </a>
            </li>
          </ul>

          <div className="flex gap-2">
            <a
              href="https://youtube.com/@winthenight"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded border border-[#1a1a1a] flex items-center justify-center text-[#555] hover:border-[#00d9ff] hover:text-[#00d9ff] transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com/win_the_night"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded border border-[#1a1a1a] flex items-center justify-center text-[#555] hover:border-[#00d9ff] hover:text-[#00d9ff] transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://tiktok.com/@winthenightpod"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded border border-[#1a1a1a] flex items-center justify-center text-[#555] hover:border-[#00d9ff] hover:text-[#00d9ff] transition-all duration-200"
              aria-label="TikTok"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
            </a>
            <a
              href="https://winthenight.blog"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded border border-[#1a1a1a] flex items-center justify-center text-[#555] hover:border-[#00d9ff] hover:text-[#00d9ff] transition-all duration-200"
              aria-label="Substack"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.72rem] text-[#555] font-sans">
          <p>
            © {currentYear} Win The Night™ Foundation ·{" "}
            <a
              href="https://froydinger.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              Powered by FDS™
            </a>
          </p>
          <p>A mental health community built on real conversations</p>
        </div>
      </div>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </footer>
  );
};

export default Footer;
