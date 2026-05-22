import { useState, useEffect, useRef } from "react";
import {
  Menu,
  Shield,
  LogIn,
  LogOut,
  Settings,
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
} from "lucide-react";
import logo from "@/assets/win-the-night-productions-logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import AuthDialog from "@/components/updates/AuthDialog";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/context/AudioContext";

const Header = () => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const { isPlaying } = useAudio();

  useEffect(() => {
    // Always show logo on all pages
    setLogoVisible(true);
  }, [isHomePage]);

  useEffect(() => {
    // Set up listener FIRST so we don't miss auth events (e.g. magic link redirect)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    // Check database for admin role only - no client-side whitelist
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();

    setIsAdmin(!!data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Reset scroll position when sidebar opens
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
    }
  }, [isOpen]);

  // Organize menu items by type
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
    { label: "Crisis Resources", href: "/crisis-resources", icon: LifeBuoy },
    { label: "Legal", href: "/legal", icon: Info },
  ];

  const sectionAnchors = [
    { label: "What We're About", id: "features" },
    { label: "Community", id: "community" },
    { label: "Join Us", id: "cta" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      <div className="container mx-auto h-16 flex items-center justify-between px-4 pt-2">
        {/* Logo - only visible after scrolling */}
        <a
          href="/"
          className={`flex items-center group py-2 transition-all duration-500 ${
            logoVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={logo}
            alt="Win The Night"
            loading="eager"
            decoding="async"
            className="h-8 w-8 object-contain drop-shadow-[0_0_15px_rgba(0,217,255,0.5)] transition-transform duration-300 group-hover:scale-110"
          />
        </a>

        {/* Mobile Nav Links */}
        <nav className="flex md:hidden items-center gap-1 mr-auto ml-4">
          <a
            href="/watch"
            className="px-2.5 py-1.5 text-xs font-bold text-neon-blue hover:text-[#7dd7ff] transition-colors duration-200 rounded-md hover:bg-neon-blue/10 drop-shadow-[0_0_6px_rgba(93,204,255,0.6)]"
          >
            Watch
          </a>
          <a
            href="/support"
            className="px-2.5 py-1.5 text-xs font-medium text-foreground/70 hover:text-neon-blue transition-colors duration-200 rounded-md hover:bg-white/5"
          >
            Support Us
          </a>
          {isHomePage && (
            <a
              href="/crisis-resources"
              className="px-2.5 py-1.5 text-xs font-bold text-green-400 hover:text-green-300 transition-colors duration-200 rounded-md hover:bg-green-400/10 drop-shadow-[0_0_6px_rgba(74,222,128,0.6)]"
            >
              Crisis & Care
            </a>
          )}
        </nav>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 mr-auto ml-6">
          <a
            href="/blog"
            className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-neon-blue transition-colors duration-200 rounded-md hover:bg-white/5"
          >
            Blog
          </a>
          <a
            href="/watch"
            className="px-3 py-1.5 text-sm font-bold text-neon-blue hover:text-[#7dd7ff] transition-colors duration-200 rounded-md hover:bg-neon-blue/10 drop-shadow-[0_0_8px_rgba(93,204,255,0.6)]"
          >
            Watch
          </a>
          <a
            href="/listen"
            className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-neon-blue transition-colors duration-200 rounded-md hover:bg-white/5"
          >
            Listen
          </a>
          <a
            href="/updates"
            className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-neon-blue transition-colors duration-200 rounded-md hover:bg-white/5"
          >
            Community
          </a>
          <a
            href="/support"
            className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-neon-blue transition-colors duration-200 rounded-md hover:bg-white/5"
          >
            Support Us
          </a>
          {isHomePage && (
            <a
              href="/crisis-resources"
              className="px-3 py-1.5 text-sm font-bold text-green-400 hover:text-green-300 transition-colors duration-200 rounded-md hover:bg-green-400/10 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]"
            >
              Crisis &amp; Care
            </a>
          )}
        </nav>

        {/* Hamburger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className={`p-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 ${
                isPlaying ? "shadow-[0_0_12px_rgba(93,204,255,0.6)] bg-neon-blue/20" : ""
              }`}
              aria-label="Open menu"
            >
              <Menu className={`w-5 h-5 transition-colors ${isPlaying ? "text-neon-blue" : "text-white"}`} strokeWidth={1.5} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-background/98 backdrop-blur-xl border-l border-neon-blue/30 flex flex-col"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-neon-blue/20 mt-8 flex-shrink-0">
              <img
                src={logo}
                alt="Win The Night"
                className="h-12 w-12 object-contain drop-shadow-[0_0_20px_rgba(0,217,255,0.6)]"
              />
              <span className="text-xl font-bold text-foreground">
                Win The Night<span className="text-[0.5em] align-super">™</span>
              </span>
            </div>

            <div
              className="flex-1 overflow-y-scroll min-h-0 py-4 pr-1 relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neon-blue/40 hover:scrollbar-thumb-neon-blue/60"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0, 217, 255, 0.4) transparent',
                scrollbarGutter: 'stable'
              }}
              ref={scrollAreaRef}
            >
              <nav className="flex flex-col gap-4">
                {/* Page Links Section */}
                <div>
                  <h3 className="text-xs font-semibold text-neon-blue uppercase tracking-wider px-4 mb-3">Pages</h3>
                  <div className="grid grid-cols-2 gap-2 px-2">
                    {pageLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-neon-blue/20 hover:border-neon-blue/50 hover:text-neon-blue text-foreground transition-all duration-300 group"
                        >
                          <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Section Anchors - Only show on home page */}
                {isHomePage && (
                  <div className="pt-2 border-t border-border/30">
                    <h3 className="text-xs font-semibold text-neon-blue uppercase tracking-wider px-4 mb-3">
                      Jump to Section
                    </h3>
                    <div className="grid grid-cols-1 gap-2 px-2">
                      {sectionAnchors.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="w-full text-center px-4 py-2.5 rounded-lg border border-border/30 bg-card/30 hover:bg-neon-blue/10 hover:border-neon-blue/30 hover:text-neon-blue text-foreground/80 transition-all duration-300 text-sm font-medium"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </nav>
            </div>

            {/* Auth Section - Fixed at bottom */}
            <div className="flex-shrink-0 pt-4 border-t border-neon-blue/20 space-y-3">
              {session ? (
                <>
                  <div className="px-4 py-2 bg-card/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Signed in as</p>
                    <p className="text-sm font-medium text-foreground truncate">{session.user.email}</p>
                  </div>

                  {isAdmin && (
                    <Button
                      onClick={() => {
                        navigate("/admin");
                        setIsOpen(false);
                      }}
                      className="w-full bg-neon-blue hover:bg-neon-blue/90 text-white"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}

                   <Button
                     onClick={() => {
                       navigate("/dashboard");
                       setIsOpen(false);
                     }}
                     variant="outline"
                     className="w-full border-border hover:bg-accent"
                   >
                     <Settings className="h-4 w-4 mr-2" />
                     My Dashboard
                   </Button>

                  <Button onClick={handleSignOut} variant="outline" className="w-full border-border hover:bg-accent">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setShowAuth(true)}
                  className="w-full bg-neon-blue hover:bg-neon-blue/90 text-white"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}

              <div className="pt-3 border-t border-neon-blue/20">
                <p className="text-sm text-muted-foreground text-center font-thin">
                  One <span className="font-bold">Connection.</span> One <span className="font-bold">Story.</span>
                  <br />
                  One <span className="font-bold">Conversation</span> at a Time.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <AuthDialog open={showAuth} onOpenChange={setShowAuth} />
    </header>
  );
};

export default Header;
