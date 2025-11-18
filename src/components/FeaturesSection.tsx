import { Play, Users, Heart, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Play,
    title: "Weekly Episodes",
    description: "New mental health focused content every week that feels like talking with a friend at night.",
    gradient: "from-neon-blue/20 to-transparent",
  },
  {
    icon: Heart,
    title: "Real Stories",
    description: "Stories about loss, healing, and rediscovery. No fake positivity, just authentic experiences.",
    gradient: "from-neon-dim/20 to-transparent",
  },
  {
    icon: Brain,
    title: "Practical Tools",
    description: "Access tools like Noteily (note app), ArcAI (mental wellness AI), our Substack, and reflections to support your journey.",
    gradient: "from-neon-blue/20 to-transparent",
  },
  {
    icon: Users,
    title: "Supportive Community",
    description: "A community that treats you like a human, not a project. You're welcome as you are.",
    gradient: "from-neon-dim/20 to-transparent",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative pt-6 pb-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground">
            What We're About
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A different kind of mental health space — honest, introspective, and human.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Animated gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <feature.icon className="w-8 h-8 text-neon-blue" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
