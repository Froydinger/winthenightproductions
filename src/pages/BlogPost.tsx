import { useParams, Link } from "react-router-dom";
import { useSubstackFeed } from "@/hooks/use-substack-feed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Calendar, User, MessageCircle, Heart, ExternalLink, ArrowLeft, Headphones, Share2 } from "lucide-react";
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
            <div className="container mx-auto px-4 max-w-5xl">
              <Skeleton className="h-10 w-40 mb-8" />
              <div className="bg-card/40 backdrop-blur-xl border border-neon-blue/20 rounded-2xl p-8 md:p-12">
                <Skeleton className="h-16 w-3/4 mb-6" />
                <div className="flex gap-6 mb-8">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                </div>
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
            <div className="container mx-auto px-4 max-w-5xl text-center">
              <div className="bg-card/40 backdrop-blur-xl border border-border/30 rounded-2xl p-12">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-purple-500 bg-clip-text text-transparent">
                  Post Not Found
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  The blog post you're looking for doesn't exist or has been removed.
                </p>
                <Button asChild className="bg-neon-blue hover:bg-neon-blue/90 text-white">
                  <Link to="/blog">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
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
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Back Button */}
            <Button
              asChild
              variant="ghost"
              className="mb-8 hover:bg-neon-blue/10 hover:text-neon-blue transition-all duration-300"
            >
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            {/* Article Container with Enhanced Glassmorphism */}
            <article className="bg-card/40 backdrop-blur-xl border border-neon-blue/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(93,204,255,0.1)]">
              {/* Article Header with Gradient Accent */}
              <div className="relative p-8 md:p-12 pb-8 border-b border-neon-blue/10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-purple-500 to-neon-blue"></div>

                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                  <span className="flex items-center gap-2 bg-neon-blue/10 px-4 py-2 rounded-full border border-neon-blue/30">
                    <Calendar className="h-4 w-4 text-neon-blue" />
                    <span className="text-sm font-medium">{formatDate(post.pubDate)}</span>
                  </span>
                  <span className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/30">
                    <User className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">{post.author}</span>
                  </span>
                </div>

                {/* Engagement Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/20 hover:border-neon-blue transition-all duration-300"
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <Heart className="h-4 w-4 mr-2" />
                      Like on Substack
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-300"
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Comment
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-border/50 hover:bg-accent hover:border-neon-blue/50 transition-all duration-300"
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Substack
                    </a>
                  </Button>
                </div>
              </div>

              {/* Audio Player for Podcasts */}
              {post.isPodcast && post.audioUrl && (
                <div className="mx-8 md:mx-12 my-8 bg-gradient-to-br from-neon-blue/10 to-purple-500/10 rounded-xl p-6 border border-neon-blue/30 shadow-[0_0_30px_rgba(93,204,255,0.1)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-neon-blue/20 rounded-lg">
                      <Headphones className="h-6 w-6 text-neon-blue" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">Listen to Episode</h2>
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
                <div className="mx-8 md:mx-12 my-8 bg-gradient-to-br from-neon-blue/10 to-purple-500/10 rounded-xl p-8 border border-neon-blue/30 shadow-[0_0_30px_rgba(93,204,255,0.1)]">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="p-4 bg-neon-blue/20 rounded-full">
                      <Headphones className="h-12 w-12 text-neon-blue" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">Podcast Episode</h2>
                    <p className="text-muted-foreground">
                      Listen to this episode on Substack
                    </p>
                    <Button
                      asChild
                      className="bg-neon-blue hover:bg-neon-blue/90 text-white shadow-[0_0_20px_rgba(93,204,255,0.3)]"
                    >
                      <a href={post.link} target="_blank" rel="noopener noreferrer">
                        <Headphones className="h-4 w-4 mr-2" />
                        Listen Now
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Article Content with Custom Styling */}
              <div className="p-8 md:p-12 pt-8">
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Bottom CTA with Gradient */}
              <div className="mx-8 md:mx-12 mb-8 p-8 bg-gradient-to-br from-neon-blue/5 to-purple-500/5 rounded-xl border border-neon-blue/20 text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Continue the conversation
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join us on Substack to like, comment, and engage with our community
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    className="bg-neon-blue hover:bg-neon-blue/90 text-white shadow-[0_0_20px_rgba(93,204,255,0.2)]"
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <Heart className="h-4 w-4 mr-2" />
                      Like & Subscribe
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Leave a Comment
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <Footer />

        {/* Custom Styles for Blog Content */}
        <style>{`
          .blog-content h1 {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
            font-weight: 700 !important;
            color: hsl(var(--foreground)) !important;
            margin-top: 3rem !important;
            margin-bottom: 1.5rem !important;
            background: linear-gradient(135deg, #5DCCFF 0%, #A78BFA 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .blog-content h2 {
            font-size: 2rem !important;
            line-height: 1.3 !important;
            font-weight: 700 !important;
            color: hsl(var(--foreground)) !important;
            margin-top: 2.5rem !important;
            margin-bottom: 1.25rem !important;
            position: relative;
            padding-left: 1.25rem;
          }

          .blog-content h2::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.25rem;
            bottom: 0.25rem;
            width: 4px;
            background: linear-gradient(180deg, #5DCCFF 0%, #A78BFA 100%);
            border-radius: 2px;
          }

          .blog-content h3 {
            font-size: 1.75rem !important;
            line-height: 1.4 !important;
            font-weight: 600 !important;
            color: hsl(var(--foreground)) !important;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
          }

          .blog-content h4 {
            font-size: 1.5rem !important;
            line-height: 1.5 !important;
            font-weight: 600 !important;
            color: hsl(var(--foreground)) !important;
            margin-top: 1.75rem !important;
            margin-bottom: 0.875rem !important;
          }

          .blog-content p {
            font-size: 1.125rem !important;
            line-height: 2rem !important;
            color: hsl(var(--muted-foreground)) !important;
            margin-bottom: 1.75rem !important;
            font-weight: 400;
          }

          .blog-content a {
            color: #5DCCFF !important;
            font-weight: 500 !important;
            text-decoration: none !important;
            transition: all 0.2s ease !important;
            border-bottom: 2px solid transparent;
          }

          .blog-content a:hover {
            color: #4DB8E6 !important;
            border-bottom-color: #5DCCFF;
            text-shadow: 0 0 8px rgba(93, 204, 255, 0.5);
          }

          .blog-content strong {
            color: hsl(var(--foreground)) !important;
            font-weight: 700 !important;
          }

          .blog-content em {
            color: hsl(var(--foreground)) !important;
            opacity: 0.9 !important;
            font-style: italic !important;
          }

          .blog-content img {
            border-radius: 1rem !important;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.3), 0 0 30px rgba(93, 204, 255, 0.1) !important;
            margin-top: 2.5rem !important;
            margin-bottom: 2.5rem !important;
            border: 1px solid rgba(93, 204, 255, 0.1);
          }

          .blog-content ul,
          .blog-content ol {
            color: hsl(var(--muted-foreground)) !important;
            line-height: 2rem !important;
            margin-top: 1.5rem !important;
            margin-bottom: 1.5rem !important;
            padding-left: 1.75rem !important;
          }

          .blog-content li {
            font-size: 1.125rem !important;
            margin-bottom: 0.75rem !important;
            position: relative;
          }

          .blog-content ul li::marker {
            color: #5DCCFF !important;
            font-size: 1.25em;
          }

          .blog-content ol li::marker {
            color: #5DCCFF !important;
            font-weight: 600;
          }

          .blog-content blockquote {
            border-left: 4px solid #5DCCFF !important;
            background: rgba(93, 204, 255, 0.05);
            padding: 1.5rem !important;
            padding-left: 2rem !important;
            border-radius: 0 0.5rem 0.5rem 0;
            font-style: italic !important;
            color: hsl(var(--foreground)) !important;
            opacity: 0.9 !important;
            margin: 2rem 0 !important;
            box-shadow: 0 0 20px rgba(93, 204, 255, 0.05);
          }

          .blog-content code {
            color: #5DCCFF !important;
            background-color: rgba(93, 204, 255, 0.1) !important;
            padding: 0.25rem 0.625rem !important;
            border-radius: 0.375rem !important;
            font-size: 0.9em !important;
            font-family: 'Courier New', Courier, monospace;
            border: 1px solid rgba(93, 204, 255, 0.2);
          }

          .blog-content pre {
            background: rgba(93, 204, 255, 0.05) !important;
            border: 1px solid rgba(93, 204, 255, 0.2) !important;
            border-radius: 0.75rem !important;
            padding: 1.5rem !important;
            overflow-x: auto !important;
            margin: 2rem 0 !important;
          }

          .blog-content pre code {
            background: none !important;
            border: none !important;
            padding: 0 !important;
          }

          .blog-content hr {
            border: none;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(93, 204, 255, 0.3), transparent);
            margin: 3rem 0 !important;
          }

          .blog-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
          }

          .blog-content th,
          .blog-content td {
            padding: 0.75rem 1rem;
            border: 1px solid rgba(93, 204, 255, 0.2);
          }

          .blog-content th {
            background: rgba(93, 204, 255, 0.1);
            color: #5DCCFF;
            font-weight: 600;
          }
        `}</style>
      </main>
    </>
  );
};

export default BlogPost;
