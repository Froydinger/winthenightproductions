import { Youtube, ExternalLink, Instagram, Facebook, Heart, BookOpen } from "lucide-react";
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
                <span>Podcast Site</span>
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
                href="https://winthenight.org/be-our-guest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <span>Be Our Guest!</span>
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
              <a
                href="https://winthenight.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <Heart className="w-4 h-4 group-hover:text-neon-blue transition-colors" />
                <span>Donate</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://winthenight.org/blog/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <BookOpen className="w-4 h-4 group-hover:text-neon-blue transition-colors" />
                <span>Blog</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://winthenight.org/crisis-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <Heart className="w-4 h-4 transition-colors" />
                <span>Crisis Resources</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://youtube.com/@winthenight?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-neon-blue/20 border border-neon-blue/40 text-neon-blue hover:bg-neon-blue/30 hover:border-neon-blue transition-all duration-300 hover:scale-105 group"
              >
                <Youtube className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">Subscribe on YouTube</span>
              </a>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/win_the_night"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 border border-border/30 text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 transition-all duration-300 hover:scale-110 group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100092673610697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 border border-border/30 text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10 transition-all duration-300 hover:scale-110 group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="https://winthenight.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 border border-border/30 text-[#FF6719] hover:border-[#FF6719]/40 hover:bg-[#FF6719]/10 transition-all duration-300 hover:scale-110 group"
                  aria-label="Read our Substack"
                >
                  <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Win The Night™. All rights reserved.</p>
          <p className="text-xs">
            A mental health community built on real conversations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
