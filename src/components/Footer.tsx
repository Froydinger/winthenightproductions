import { Youtube, ExternalLink } from "lucide-react";
import logo from "@/assets/win-the-night-logo.webp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              One Connection. One Story. One Conversation at a Time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <a
                href="https://winthenight.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <span>Main Site</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://winthenight.org/watch/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <span>Watch Episodes</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://winthenight.org/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <span>About Us</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Connect</h3>
            <a
              href="https://youtube.com/@winthenight?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-neon-blue/20 border border-neon-blue/40 text-neon-blue hover:bg-neon-blue/30 hover:border-neon-blue transition-all duration-300 hover:scale-105 group"
            >
              <Youtube className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="font-semibold">Subscribe on YouTube</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Win The Night. All rights reserved.</p>
          <p className="text-xs">
            A mental health community built on real conversations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
