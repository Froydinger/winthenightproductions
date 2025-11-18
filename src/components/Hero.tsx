import { Button } from "@/components/ui/button";
import { Check, Play, Youtube } from "lucide-react";
import logo from "@/assets/win-the-night-logo.webp";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-charcoal to-background animate-gradient-shift bg-[length:200%_200%]" />
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neon-blue rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <img
                src={logo}
                alt="Win The Night"
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-[0_0_30px_rgba(0,217,255,0.4)] animate-float"
              />
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight text-center lg:text-left">
                Win The Night
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-neon-blue font-light text-center lg:text-left">
                One Connection. One Story. One Conversation at a Time.
              </p>
            </div>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl text-center lg:text-left">
              Win The Night is a mental health focused community built on real conversations, not highlight reels. 
              If you care about healing, inner child work, generational trauma, and honest stories that make you 
              feel less alone, this is your corner of the internet.
            </p>

            {/* Bullet Points */}
            <div className="space-y-4">
              {[
                { icon: Play, text: "Weekly mental health episodes" },
                { icon: Check, text: "Stories about loss, healing, and rediscovery" },
                { icon: Check, text: "Practical self awareness tools" },
                { icon: Check, text: "A community that treats you like a human, not a project" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-blue/30 transition-colors">
                    <item.icon className="w-4 h-4 text-neon-blue" />
                  </div>
                  <span className="text-foreground/90 text-sm sm:text-base">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="group bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon hover:shadow-neon-strong transition-all duration-300 hover:scale-105 animate-glow-pulse text-base sm:text-lg font-semibold"
              >
                <a
                  href="https://youtube.com/@winthenight?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Youtube className="w-5 h-5" />
                  Subscribe on YouTube
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-2 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-300 hover:shadow-neon text-base sm:text-lg"
              >
                <a
                  href="https://winthenight.org/watch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch the latest episode
                </a>
              </Button>
            </div>

            {/* Tertiary Link */}
            <div className="pt-2">
              <a
                href="https://winthenight.org/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 text-sm sm:text-base inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-neon-blue after:transition-all after:duration-300 hover:after:w-full"
              >
                Learn more about our story →
              </a>
            </div>
          </div>

          {/* Right Column - Community Card */}
          <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="relative group">
              {/* Glass Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/40 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 shadow-glass transition-all duration-500 hover:border-neon-blue/40 hover:shadow-neon hover:-translate-y-1">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-6">
                  {/* Card Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                    A mental health community that feels like a late night talk.
                  </h2>

                  {/* Card Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    We're here to hold space for honest conversations about anxiety, trauma, creativity, 
                    and everything in between. You're welcome whether you're in the thick of it or just 
                    starting to ask questions about your own story.
                  </p>

                  {/* Mini Checklist */}
                  <div className="space-y-3 pt-2">
                    {[
                      "No fake positivity, just real stories",
                      "Supportive, introspective community",
                      "Episodes that feel like talking with a friend at night",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-neon-blue" />
                        </div>
                        <span className="text-foreground/90 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Microcopy */}
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs sm:text-sm text-muted-foreground italic">
                      New episodes drop on YouTube. Subscribing is the best way to stay connected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
