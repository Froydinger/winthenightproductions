import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/win-the-night-productions-logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling down 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Home", href: "https://winthenight.productions" },
    { label: "What We're About", id: "features" },
    { label: "Community", id: "community" },
    { label: "Join Us", id: "cta" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto h-12 flex items-center justify-between px-4">
        {/* Logo */}
        <a
          href="https://winthenight.productions"
          className="flex items-center group py-2"
        >
          <img
            src={logo}
            alt="Win The Night"
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
              className="w-[300px] bg-background/98 backdrop-blur-xl border-l border-neon-blue/30"
            >
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b border-neon-blue/20">
                  <img
                    src={logo}
                    alt="Win The Night"
                    className="h-12 w-12 object-contain drop-shadow-[0_0_20px_rgba(0,217,255,0.6)]"
                  />
                  <span className="text-xl font-bold text-foreground">
                    Win The Night™
                  </span>
                </div>

                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="w-full text-left px-4 py-3 rounded-lg text-foreground hover:bg-neon-blue/20 hover:text-neon-blue transition-all duration-300 font-medium"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id!)}
                        className="w-full text-left px-4 py-3 rounded-lg text-foreground hover:bg-neon-blue/20 hover:text-neon-blue transition-all duration-300 font-medium"
                      >
                        {item.label}
                      </button>
                    )
                  ))}
                </nav>

                <div className="pt-4 border-t border-neon-blue/20">
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
    </header>
  );
};

export default Header;
