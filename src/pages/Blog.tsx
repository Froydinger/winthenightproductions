import { useSubstackFeed, SubstackPost } from "@/hooks/use-substack-feed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ExternalLink, Calendar, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";

const SUBSTACK_URL = "https://winthenight.blog";

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const getExcerpt = (content: string, maxLength: number = 200) => {
  const text = stripHtml(content);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

const BlogPostCard = ({ post }: { post: SubstackPost }) => {
  const [imageError, setImageError] = useState(false);

  const showLogo = post.isPodcast || !post.thumbnail || imageError;
  const logoUrl = "/icon-512.png";

  return (
    <Link to={`/blog/${encodeURIComponent(post.guid)}`}>
      <article className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(93,204,255,0.15)] cursor-pointer">
        <div className="aspect-video overflow-hidden bg-gradient-to-br from-neon-blue/10 to-purple-500/10 flex items-center justify-center">
          {showLogo ? (
            <img
              src={logoUrl}
              alt="Win The Night Logo"
              className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.pubDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>

          <h2 className="text-xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {getExcerpt(post.description)}
          </p>
        </div>
      </article>
    </Link>
  );
};

const BlogPostSkeleton = () => (
  <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden">
    <Skeleton className="aspect-video w-full" />
    <div className="p-6 space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-9 w-36" />
    </div>
  </div>
);

const Blog = () => {
  const { data: posts = [], isLoading, error } = useSubstackFeed();

  return (
    <>
      <Helmet>
        <title>Blog | Win The Night</title>
        <meta name="description" content="Insights, stories, and reflections from Win The Night. Mental health perspectives, personal growth, and community stories." />
      </Helmet>
      
      <main className="min-h-screen relative">
        {/* Global Animated Background */}
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <Header />

        <div className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-neon-blue">Win The Night</span> Blog
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Insights, stories, and reflections on mental health, personal growth, and winning your nights.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  className="bg-neon-blue hover:bg-neon-blue/90 text-white"
                >
                  <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                    <Bell className="h-4 w-4 mr-2" />
                    Subscribe on Substack
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-border hover:bg-accent"
                >
                  <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Substack
                  </a>
                </Button>
              </div>
            </div>

            {/* Posts Grid */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <BlogPostSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">Unable to load blog posts</p>
                <Button asChild variant="outline">
                  <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                    Visit our Substack directly
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No posts available yet</p>
                <Button asChild variant="outline">
                  <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                    Check out our Substack
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <BlogPostCard key={post.guid} post={post} />
                  ))}
                </div>
                
                {/* Footer CTA */}
                <div className="mt-16 text-center">
                  <div className="inline-flex flex-col items-center gap-4 p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
                    <p className="text-foreground font-medium text-lg">
                      Stay updated with our latest stories
                    </p>
                    <p className="text-muted-foreground text-sm max-w-md">
                      Subscribe to Win The Night on Substack to get new posts delivered straight to your inbox
                    </p>
                    <Button
                      asChild
                      className="bg-neon-blue hover:bg-neon-blue/90 text-white"
                    >
                      <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
                        <Bell className="h-4 w-4 mr-2" />
                        Subscribe on Substack
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Blog;
