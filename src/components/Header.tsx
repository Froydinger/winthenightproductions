import { useState, useEffect, useRef } from "react";
import {
  Menu,
  Shield,
  LogIn,
  LogOut,
  Settings,
  ChevronDown,
  Home,
  PlayCircle,
  Users,
  UserPlus,
  Info,
  Mail,
  Heart,
  LifeBuoy,
  BookOpen,
} from "lucide-react";
import logo from "@/assets/win-the-night-productions-logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import AuthDialog from "@/components/updates/AuthDialog";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [canScrollMore, setCanScrollMore] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Show logo after scrolling down 200px (only on home page)
      if (isHomePage) {
        setLogoVisible(window.scrollY > 200);
      }
    };

    // On non-home pages, always show logo
    if (!isHomePage) {
      setLogoVisible(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

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

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    // Check database for admin role
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();

    if (data) {
      setIsAdmin(true);
      return;
    }

    // Whitelist check - get current user's email and verify against allowed emails
    const { data: userData } = await supabase.auth.getUser();
    const whitelistedEmails = ["j@froydinger.com"];
    const userEmail = userData?.user?.email?.toLowerCase();
    
    if (userEmail && whitelistedEmails.includes(userEmail)) {
      // Auto-grant admin role in database for whitelisted user
      await supabase.from("user_roles").upsert({
        user_id: userId,
        role: "admin" as const,
      }, { onConflict: "user_id" });
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
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

  const checkScrollable = () => {
    const el = scrollAreaRef.current;
    if (el) {
      const hasMoreToScroll = el.scrollHeight > el.clientHeight && 
        el.scrollTop + el.clientHeight < el.scrollHeight - 10;
      setCanScrollMore(hasMoreToScroll);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Check after sheet opens and content renders
      setTimeout(checkScrollable, 100);
    }
  }, [isOpen]);

  // Organize menu items by type
  const pageLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Blog", href: "/blog", icon: BookOpen },
    { label: "Watch", href: "/watch", icon: PlayCircle },
    { label: "Community", href: "/updates", icon: Users },
    { label: "Be Our Guest", href: "/guest", icon: UserPlus },
    { label: "About", href: "/about", icon: Info },
    { label: "Contact", href: "/contact", icon: Mail },
    { label: "Support Us", href: "/support", icon: Heart },
    { label: "Crisis Resources", href: "/crisis-resources", icon: LifeBuoy },
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

        {/* Hamburger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-300"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-white" strokeWidth={1.5} />
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

            <div className="flex-1 overflow-y-auto min-h-0 py-4 relative" ref={scrollAreaRef} onScroll={checkScrollable}>
              <nav className="flex flex-col gap-4">
                {/* Page Links Section */}
                <div>
                  <h3 className="text-xs font-semibold text-neon-blue uppercase tracking-wider px-4 mb-2">Pages</h3>
                  <div className="flex flex-col gap-1">
                    {pageLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="w-full text-left px-4 py-3 rounded-lg text-foreground hover:bg-neon-blue/20 hover:text-neon-blue transition-all duration-300 font-medium flex items-center gap-3"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Section Anchors - Only show on home page */}
                {isHomePage && (
                  <div className="pt-2 border-t border-border/30">
                    <h3 className="text-xs font-semibold text-neon-blue uppercase tracking-wider px-4 mb-2">
                      Jump to Section
                    </h3>
                    <div className="flex flex-col gap-1">
                      {sectionAnchors.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="w-full text-left px-4 py-3 rounded-lg text-foreground/80 hover:bg-neon-blue/10 hover:text-neon-blue transition-all duration-300 font-normal text-sm"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </nav>

              {/* Scroll indicator */}
              {canScrollMore && (
                <div className="sticky bottom-0 left-0 right-0 flex justify-center pt-12 pb-2 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-neon-blue animate-bounce" />
                </div>
              )}
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
                      navigate("/updates");
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-border hover:bg-accent"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Profile Settings
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
                <p className="text-sm text-muted-foreground text-center">
                  One Connection. One Story.
                  <br />
                  One Conversation at a Time.
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
