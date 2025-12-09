import { useParams, Link } from "react-router-dom";
import { useSubstackFeed } from "@/hooks/use-substack-feed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Calendar, User, MessageCircle, Heart, ExternalLink, ArrowLeft, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

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

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: posts = [], isLoading } = useSubstackFeed();

  const post = posts.find(p => p.guid === postId);

  // Scroll to top when component mounts or postId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postId]);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading... | Win The Night Blog</title>
        </Helmet>

        <main className="min-h-screen relative">
          <div className="fixed inset-0 z-0">
            <AnimatedBackground />
          </div>

          <Header />

          <div className="relative z-10 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <Skeleton className="h-8 w-32 mb-8" />
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-64 mb-8" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Post Not Found | Win The Night Blog</title>
        </Helmet>

        <main className="min-h-screen relative">
          <div className="fixed inset-0 z-0">
            <AnimatedBackground />
          </div>

          <Header />

          <div className="relative z-10 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>

          <Footer />
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Win The Night Blog</title>
        <meta name="description" content={post.description.substring(0, 160)} />
      </Helmet>

      <main className="min-h-screen relative">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <Header />

        <div className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <Button asChild variant="ghost" className="mb-8">
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            {/* Article Header */}
            <article className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-8 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {formatDate(post.pubDate)}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {post.author}
                </span>
              </div>

              {/* Engagement Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 pb-6 border-b border-border/50">
                <Button
                  asChild
                  variant="outline"
                  className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
                >
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <Heart className="h-4 w-4 mr-2" />
                    Like on Substack
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
                >
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comment
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-border hover:bg-accent"
                >
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Substack
                  </a>
                </Button>
              </div>

              {/* Audio Player for Podcasts */}
              {post.isPodcast && post.audioUrl && (
                <div className="bg-gradient-to-br from-neon-blue/10 to-purple-500/10 rounded-lg p-6 border border-neon-blue/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Headphones className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-semibold">Listen to Episode</h2>
                  </div>
                  <audio
                    controls
                    className="w-full"
                    preload="metadata"
                  >
                    <source src={post.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {/* Listen/Watch Button for Podcasts without embedded audio */}
              {post.isPodcast && !post.audioUrl && (
                <div className="bg-gradient-to-br from-neon-blue/10 to-purple-500/10 rounded-lg p-6 border border-neon-blue/30">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Headphones className="h-12 w-12 text-neon-blue" />
                    <h2 className="text-xl font-semibold">Podcast Episode</h2>
                    <p className="text-muted-foreground">
                      Listen to this episode on Substack
                    </p>
                    <Button
                      asChild
                      className="bg-neon-blue hover:bg-neon-blue/90 text-white"
                    >
                      <a href={post.link} target="_blank" rel="noopener noreferrer">
                        <Headphones className="h-4 w-4 mr-2" />
                        Listen Now
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                  prose-h1:text-4xl prose-h1:leading-tight
                  prose-h2:text-3xl prose-h2:leading-snug
                  prose-h3:text-2xl prose-h3:leading-snug
                  prose-h4:text-xl
                  prose-p:text-muted-foreground prose-p:leading-loose prose-p:mb-6 prose-p:text-lg
                  prose-a:text-neon-blue prose-a:font-medium prose-a:no-underline prose-a:transition-all
                  hover:prose-a:text-neon-blue/80 hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-em:text-foreground/90 prose-em:italic
                  prose-img:rounded-lg prose-img:shadow-2xl prose-img:my-8
                  prose-ul:text-muted-foreground prose-ul:leading-loose prose-ul:my-6
                  prose-ol:text-muted-foreground prose-ol:leading-loose prose-ol:my-6
                  prose-li:mb-2 prose-li:text-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-neon-blue/50 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground/80
                  prose-code:text-neon-blue prose-code:bg-neon-blue/10 prose-code:px-2 prose-code:py-1 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Bottom CTA */}
              <div className="mt-12 pt-8 border-t border-border/50 text-center">
                <p className="text-muted-foreground mb-4">
                  Continue the conversation on Substack
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <Heart className="h-4 w-4 mr-2" />
                      Like
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Comment
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default BlogPost;
