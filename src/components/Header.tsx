import { useState, useEffect, useRef } from "react";
import {
  Menu,
  Home,
  PlayCircle,
  Users,
  UserPlus,
  Info,
  Mail,
  Heart,
  LifeBuoy,
  BookOpen,
  Music,
  Youtube,
} from "lucide-react";
import logo from "@/assets/win-the-night-logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { useAudio } from "@/context/AudioContext";
import { NewsletterDialog } from "@/components/NewsletterSubscribe";

const Header = () => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { isPlaying } = useAudio();

  useEffect(() => {
    setLogoVisible(true);
  }, [isHomePage]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const pageLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Blog", href: "/blog", icon: BookOpen },
    { label: "Watch", href: "/watch", icon: PlayCircle },
    { label: "Listen", href: "/listen", icon: Music },
    { label: "Community", href: "/updates", icon: Users },
    { label: "Be Our Guest", href: "/guest", icon: UserPlus },
    { label: "About", href: "/about", icon: Info },
    { label: "Contact", href: "/contact", icon: Mail },
    { label: "Support Us", href: "/support", icon: Heart },
    { label: "Care & Crisis", href: "/crisis-resources", icon: LifeBuoy },
    { label: "Legal", href: "/legal", icon: Info },
  ];

  const sectionAnchors = [
    { label: "Latest", id: "episodes" },
    { label: "Explore", id: "explore" },
    { label: "Updates", id: "updates" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/92 backdrop-blur-xl border-b border-[#111]">
      <div className="h-2 w-full bg-neon-blue shadow-[0_0_16px_rgba(93,204,255,0.9)]" />
      <div className="container mx-auto h-16 flex items-center justify-between gap-2 px-4 sm:px-8 pt-2">
        <a
          href="/"
          className={`flex min-w-0 shrink-0 items-center gap-2 group transition-all duration-500 ${
            logoVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={logo}
            alt="Win The Night"
            loading="eager"
            decoding="async"
            className="h-10 w-10 object-contain rounded-full drop-shadow-[0_0_8px_rgba(0,217,255,0.8)] transition-transform duration-300 group-hover:scale-110"
          />
          <div className="hidden xl:block ml-2 font-bebas text-xl tracking-wider text-white select-none leading-none whitespace-nowrap">
            WIN THE <span className="text-[#00d9ff]">NIGHT</span>
          </div>
          <div className="hidden xl:block w-[1px] h-6 bg-[#222]" />
          <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-[#777] font-medium leading-none whitespace-nowrap xl:text-[#555]">
            Foundation
          </span>
        </a>

        {/* Mobile Navigation */}
        <nav className="flex xl:hidden items-center gap-1 mr-auto ml-2 sm:ml-4 min-w-0">
          <a
            href="/watch"
            className="px-2.5 py-1.5 text-xs font-bold text-[#00d9ff] hover:text-[#7dd7ff] transition-colors duration-200 rounded-md hover:bg-[#00d9ff]/10 drop-shadow-[0_0_6px_rgba(0,217,255,0.6)] uppercase tracking-wider whitespace-nowrap"
          >
            Watch
          </a>
          <a
            href="/about"
            className="hidden min-[390px]:inline-flex px-2.5 py-1.5 text-xs font-medium text-foreground/70 hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 uppercase tracking-wider whitespace-nowrap"
          >
            About
          </a>
          <a
            href="/crisis-resources"
            className="px-2.5 py-1.5 text-xs font-bold text-[#10b981] hover:text-[#34d399] transition-colors duration-200 rounded-md hover:bg-[#10b981]/10 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)] uppercase tracking-wider whitespace-nowrap"
          >
            Care
          </a>
        </nav>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 mr-auto ml-6 min-w-0 flex-nowrap overflow-hidden">
          <a href="/blog" className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 uppercase tracking-wider whitespace-nowrap">
            Blog
          </a>
          <a href="/watch" className="px-3 py-1.5 text-xs font-bold text-[#00d9ff] hover:text-[#7dd7ff] transition-colors duration-200 rounded-md hover:bg-[#00d9ff]/10 drop-shadow-[0_0_8px_rgba(0,217,255,0.6)] uppercase tracking-wider whitespace-nowrap">
            Watch
          </a>
          <a href="/listen" className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 uppercase tracking-wider whitespace-nowrap">
            Listen
          </a>
          <a href="/updates" className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 uppercase tracking-wider whitespace-nowrap">
            Community
          </a>
          <a href="/about" className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 uppercase tracking-wider whitespace-nowrap">
            About
          </a>
          <a href="/support" className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 uppercase tracking-wider whitespace-nowrap">
            Support Us
          </a>
          <a href="/crisis-resources" className="px-3 py-1.5 text-xs font-bold text-[#10b981] hover:text-[#34d399] transition-colors duration-200 rounded-md hover:bg-[#10b981]/10 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] uppercase tracking-wider whitespace-nowrap">
            Care &amp; Crisis
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="https://youtube.com/@winthenight?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-2 bg-[#00d9ff] hover:opacity-85 text-black font-bold uppercase tracking-wider text-xs px-4 py-2 rounded shadow-[0_0_12px_rgba(0,217,255,0.5)] transition-all whitespace-nowrap"
            aria-label="Subscribe on YouTube"
          >
            <Youtube className="w-3.5 h-3.5" />
            Subscribe
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className={`p-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 ${
                  isPlaying ? "shadow-[0_0_12px_rgba(0,217,255,0.6)] bg-[#00d9ff]/20" : ""
                }`}
                aria-label="Open menu"
              >
                <Menu className={`w-5 h-5 transition-colors ${isPlaying ? "text-[#00d9ff]" : "text-white"}`} strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-black border-l border-[#00d9ff]/30 flex flex-col"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-[#00d9ff]/20 mt-8 flex-shrink-0">
                <img
                  src={logo}
                  alt="Win The Night"
                  className="h-14 w-14 object-contain rounded-full drop-shadow-[0_0_20px_rgba(0,217,255,0.6)]"
                />
                <span className="text-xl font-bebas tracking-wide text-white">
                  WIN THE <span className="text-[#00d9ff]">NIGHT</span>
                </span>
              </div>

              <div
                className="flex-1 overflow-y-scroll min-h-0 py-4 pr-1 relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#00d9ff]/40 hover:scrollbar-thumb-[#00d9ff]/60"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 217, 255, 0.4) transparent",
                  scrollbarGutter: "stable",
                }}
                ref={scrollAreaRef}
              >
                <nav className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xs font-semibold text-[#00d9ff] uppercase tracking-wider px-4 mb-3">Pages</h3>
                    <div className="grid grid-cols-2 gap-2 px-2">
                      {pageLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-[#1a1a1a] bg-[#0d0d0d] hover:bg-[#00d9ff]/20 hover:border-[#00d9ff]/50 hover:text-[#00d9ff] text-foreground transition-all duration-300 group"
                          >
                            <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
                          </a>
                        );
                      })}
                    </div>
                    <div className="px-2 mt-3">
                      <a
                        href="https://youtube.com/@winthenight?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#00d9ff] text-black font-bold uppercase tracking-wider text-xs hover:opacity-85 shadow-[0_0_16px_rgba(0,217,255,0.5)] transition-all"
                      >
                        <Youtube className="w-4 h-4" />
                        Subscribe
                      </a>
                    </div>
                  </div>

                  {isHomePage && (
                    <div className="pt-2 border-t border-[#1a1a1a]">
                      <h3 className="text-xs font-semibold text-[#00d9ff] uppercase tracking-wider px-4 mb-3">
                        Jump to Section
                      </h3>
                      <div className="grid grid-cols-1 gap-2 px-2">
                        {sectionAnchors.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="w-full text-center px-4 py-2.5 rounded border border-[#1a1a1a] bg-[#0d0d0d] hover:bg-[#00d9ff]/10 hover:border-[#00d9ff]/30 hover:text-[#00d9ff] text-foreground/80 transition-all duration-300 text-sm font-medium"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </nav>
              </div>

              <div className="flex-shrink-0 pt-4 border-t border-[#00d9ff]/20">
                <p className="text-sm text-muted-foreground text-center font-thin">
                  One <span className="font-bold">Connection.</span> One <span className="font-bold">Story.</span>
                  <br />
                  One <span className="font-bold">Conversation</span> at a Time.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
