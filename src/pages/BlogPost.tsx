import { useParams, Link } from "react-router-dom";
import { useSubstackFeed } from "@/hooks/use-substack-feed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Calendar, User, MessageCircle, Heart, ExternalLink, ArrowLeft, Headphones } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

const SanitizedBlogContent = ({ html }: { html: string }) => {
  const clean = useMemo(
    () =>
      DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          "p", "a", "img", "strong", "em", "b", "i", "u", "ul", "ol", "li",
          "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "br", "hr",
          "code", "pre", "figure", "figcaption", "span", "div", "iframe",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel", "class", "loading", "width", "height", "allow", "allowfullscreen", "frameborder"],
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
      }),
    [html]
  );
  return <div className="blog-content" dangerouslySetInnerHTML={{ __html: clean }} />;
};

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: posts = [], isLoading, isError } = useSubstackFeed();

  const decodedPostId = postId ? decodeURIComponent(postId) : '';
  const post = posts.find(p => p.guid === decodedPostId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading... | Win The Night Blog</title>
        </Helmet>
        <Header />
        <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
          <div className="fixed inset-0 z-0">
            <AnimatedBackground />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
            <Skeleton className="h-6 w-24 bg-white/5 mb-8" />
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-8 rounded space-y-6">
              <Skeleton className="h-12 bg-white/5 w-3/4" />
              <div className="flex gap-4">
                <Skeleton className="h-4 bg-white/5 w-20" />
                <Skeleton className="h-4 bg-white/5 w-24" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 bg-white/5 w-full" />
                <Skeleton className="h-4 bg-white/5 w-full" />
                <Skeleton className="h-4 bg-white/5 w-2/3" />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  if (!post || isError) {
    return (
      <>
        <Helmet>
          <title>Post Not Found | Win The Night Blog</title>
        </Helmet>
        <Header />
        <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
          <div className="fixed inset-0 z-0">
            <AnimatedBackground />
          </div>
          <div className="relative z-10 max-w-xl mx-auto px-6 py-20 text-center space-y-6">
            <h1 className="font-bebas text-5xl text-red-500 tracking-wider">Post Not Found</h1>
            <p className="text-xs text-[#555] leading-relaxed">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-xs px-6 py-3 rounded transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Blog
            </Link>
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

      <Header />

      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          {/* Back button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#555] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 text-[#00d9ff]" />
            Back to Blog
          </Link>

          {/* Article Container */}
          <article className="bg-[#0d0d0d] border border-[#1a1a1a] rounded overflow-hidden">
            
            {/* Featured Image */}
            {post.thumbnail && !post.isPodcast && (
              <div className="aspect-[21/9] overflow-hidden bg-black border-b border-[#111]">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}

            {/* Title / Meta */}
            <div className="p-8 md:p-12 pb-6 border-b border-[#111] space-y-6">
              <h1 className="font-bebas text-4xl md:text-6xl tracking-wide text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-[10px] text-[#555] uppercase tracking-wider font-sans">
                <span className="flex items-center gap-1.5 border border-[#1a1a1a] px-3 py-1.5 rounded">
                  <Calendar className="h-3.5 w-3.5 text-[#00d9ff]" />
                  {formatDate(post.pubDate)}
                </span>
                <span className="flex items-center gap-1.5 border border-[#1a1a1a] px-3 py-1.5 rounded">
                  <User className="h-3.5 w-3.5 text-[#00d9ff]" />
                  {post.author}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-5 py-3 rounded transition-all flex items-center gap-1.5"
                >
                  <Heart className="h-3.5 w-3.5" />
                  Like on Substack
                </a>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-5 py-3 rounded transition-all flex items-center gap-1.5"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Comment
                </a>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-[10px] px-5 py-3.5 rounded transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View on Substack
                </a>
              </div>
            </div>

            {/* Audio Player for Podcasts */}
            {post.isPodcast && post.audioUrl && (
              <div className="mx-8 md:mx-12 my-8 bg-[#050505] border border-[#1a1a1a] p-6 rounded space-y-4">
                <div className="flex items-center gap-3">
                  <Headphones className="h-5 w-5 text-[#00d9ff]" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white">Listen to Episode</h2>
                </div>
                <audio controls className="w-full" preload="metadata">
                  <source src={post.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Article Content */}
            <div className="p-8 md:p-12 pt-6">
              <SanitizedBlogContent html={post.content} />
            </div>

            <CyanRule />

            {/* Bottom Substack CTA */}
            <div className="p-8 sm:p-12 text-center bg-black/40 space-y-6">
              <h3 className="font-bebas text-2xl tracking-wider text-white">
                Continue the conversation
              </h3>
              <p className="text-xs text-[#555] max-w-sm mx-auto leading-relaxed">
                Join us on Substack to like, comment, and engage with our community.
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all flex items-center gap-1.5"
                >
                  <Heart className="h-4 w-4" />
                  Like & Subscribe
                </a>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-[#00d9ff] font-bold uppercase tracking-wider text-xs px-6 py-3 rounded transition-all flex items-center gap-1.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  Leave a Comment
                </a>
              </div>
            </div>
          </article>
        </div>

        <Footer />

        {/* Custom Styles for Blog Content */}
        <style>{`
          .blog-content h1 {
            font-family: 'Bebas Neue', cursive, sans-serif !important;
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            margin-top: 3rem !important;
            margin-bottom: 1.5rem !important;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .blog-content h2 {
            font-family: 'Bebas Neue', cursive, sans-serif !important;
            font-size: 2rem !important;
            line-height: 1.3 !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            margin-top: 2.5rem !important;
            margin-bottom: 1.25rem !important;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-left: 2px solid #00d9ff;
            padding-left: 1rem;
          }

          .blog-content h3 {
            font-family: 'Bebas Neue', cursive, sans-serif !important;
            font-size: 1.6rem !important;
            line-height: 1.4 !important;
            color: #ffffff !important;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
            text-transform: uppercase;
          }

          .blog-content p {
            font-size: 0.88rem !important;
            line-height: 1.7 !important;
            color: #888888 !important;
            margin-bottom: 1.5rem !important;
            font-weight: 400;
          }

          .blog-content a {
            color: #00d9ff !important;
            font-weight: 600 !important;
            text-decoration: underline !important;
            text-underline-offset: 4px;
            transition: opacity 0.2s ease !important;
          }

          .blog-content a:hover {
            opacity: 0.85 !important;
          }

          .blog-content strong {
            color: #ffffff !important;
            font-weight: 700 !important;
          }

          .blog-content em {
            font-family: 'Playfair Display', serif;
            font-style: italic !important;
            color: #888;
          }

          .blog-content img {
            border-radius: 4px !important;
            margin-top: 2.5rem !important;
            margin-bottom: 2.5rem !important;
            border: 1px solid #1a1a1a;
            max-width: 100%;
          }

          .blog-content ul,
          .blog-content ol {
            color: #888888 !important;
            line-height: 1.7 !important;
            margin-top: 1.5rem !important;
            margin-bottom: 1.5rem !important;
            padding-left: 1.5rem !important;
          }

          .blog-content li {
            font-size: 0.88rem !important;
            margin-bottom: 0.75rem !important;
          }

          .blog-content ul li::marker {
            color: #00d9ff !important;
          }

          .blog-content ol li::marker {
            color: #00d9ff !important;
            font-weight: 600;
          }

          .blog-content blockquote {
            border-left: 2px solid #00d9ff !important;
            background: #050505;
            padding: 1.5rem !important;
            padding-left: 2rem !important;
            font-family: 'Playfair Display', serif;
            font-style: italic !important;
            color: #888888 !important;
            margin: 2rem 0 !important;
            border-radius: 4px;
          }

          .blog-content code {
            color: #00d9ff !important;
            background-color: #050505 !important;
            padding: 0.2rem 0.5rem !important;
            border-radius: 2px !important;
            font-size: 0.85em !important;
            font-family: monospace;
            border: 1px solid #1a1a1a;
          }

          .blog-content pre {
            background: #050505 !important;
            border: 1px solid #1a1a1a !important;
            border-radius: 4px !important;
            padding: 1.5rem !important;
            overflow-x: auto !important;
            margin: 2rem 0 !important;
          }

          .blog-content hr {
            border: none;
            height: 1px;
            background: #1a1a1a;
            margin: 3rem 0 !important;
          }
        `}</style>
      </main>
    </>
  );
};

export default BlogPost;
