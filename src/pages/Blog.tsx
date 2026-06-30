import { useSubstackFeed, SubstackPost } from "@/hooks/use-substack-feed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ExternalLink, Calendar, User, Bell, Filter, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SUBSTACK_URL = "https://winthenight.blog";

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

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const getExcerpt = (content: string, maxLength: number = 180) => {
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
      <article className="group bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#00d9ff]/30 rounded overflow-hidden transition-all duration-300 h-full flex flex-col justify-between">
        <div className="aspect-video overflow-hidden bg-black flex items-center justify-center border-b border-[#111]">
          {showLogo ? (
            <img
              src={logoUrl}
              alt="Win The Night Logo"
              className="w-20 h-20 object-contain opacity-40 group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-[10px] text-[#555] font-sans">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.pubDate)}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {post.author}
              </span>
            </div>

            <h2 className="text-sm font-bold text-white group-hover:text-[#00d9ff] transition-colors duration-300 line-clamp-2 leading-snug">
              {post.title}
            </h2>

            <p className="text-sm text-[#555] leading-relaxed line-clamp-3">
              {getExcerpt(post.description)}
            </p>
          </div>

          <div className="text-[10px] text-[#00d9ff] uppercase tracking-wider font-bold pt-2 border-t border-[#111] group-hover:underline flex items-center gap-1">
            Read post →
          </div>
        </div>
      </article>
    </Link>
  );
};

const BlogPostSkeleton = () => (
  <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded overflow-hidden animate-pulse">
    <div className="aspect-video w-full bg-white/5" />
    <div className="p-5 space-y-4">
      <div className="flex gap-4">
        <div className="h-3 bg-white/10 rounded w-20" />
        <div className="h-3 bg-white/10 rounded w-16" />
      </div>
      <div className="h-5 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-full" />
      <div className="h-3 bg-white/5 rounded w-2/3" />
    </div>
  </div>
);

const Blog = () => {
  const { data: posts = [], isLoading, error } = useSubstackFeed();
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(posts.map(post => post.author)));
    return uniqueAuthors.sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedAuthor === "all") return posts;
    return posts.filter(post => post.author === selectedAuthor);
  }, [posts, selectedAuthor]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  useEffect(() => {
    setVisibleCount(9);
  }, [selectedAuthor]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  return (
    <>
      <Helmet>
        <title>Blog | Win The Night</title>
        <meta name="description" content="Insights, stories, and reflections from Win The Night. Mental health perspectives, personal growth, and community stories." />
      </Helmet>
      
      <Header />

      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00d9ff]">Writing &amp; Essays</p>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none">
              THE <span className="text-[#00d9ff]">BLOG</span>
            </h1>
            <p className="text-sm text-[#555] max-w-xl mx-auto leading-relaxed">
              Insights, stories, and reflections on mental health, personal growth, and winning your nights.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Subscribe on Substack
              </a>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2a2a2a] hover:border-white text-white font-semibold uppercase tracking-wider text-xs px-6 py-3.5 rounded transition-colors flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Substack
              </a>
            </div>
          </div>

          <CyanRule />

          {/* Author Filter */}
          {!isLoading && !error && posts.length > 0 && authors.length > 1 && (
            <div className="flex justify-center">
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-4 flex items-center gap-3">
                <Filter className="h-4 w-4 text-[#00d9ff]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Filter:</span>
                <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                  <SelectTrigger className="w-48 bg-black border-[#1a1a1a] hover:border-[#00d9ff]/50 text-xs text-white uppercase tracking-wider transition-colors h-9">
                    <SelectValue placeholder="All Authors" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d0d0d] border-[#1a1a1a] text-xs text-white">
                    <SelectItem value="all" className="hover:bg-[#00d9ff]/10 cursor-pointer uppercase tracking-wider">
                      All Authors ({posts.length})
                    </SelectItem>
                    {authors.map((author) => (
                      <SelectItem
                        key={author}
                        value={author}
                        className="hover:bg-[#00d9ff]/10 cursor-pointer uppercase tracking-wider"
                      >
                        {author} ({posts.filter(p => p.author === author).length})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <BlogPostSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-[#0d0d0d] border border-[#1a1a1a] rounded p-8">
              <p className="text-sm text-[#555] mb-4">Unable to load blog posts at the moment.</p>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-5 py-3 rounded transition-all inline-flex items-center gap-2"
              >
                Visit Substack Directly
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-[#0d0d0d] border border-[#1a1a1a] rounded p-8">
              <p className="text-sm text-[#555] mb-4">
                {selectedAuthor === "all" ? "No posts available yet" : `No posts found by ${selectedAuthor}`}
              </p>
              {selectedAuthor !== "all" && (
                <button
                  onClick={() => setSelectedAuthor("all")}
                  className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-5 py-3 rounded transition-all mr-2"
                >
                  View All Posts
                </button>
              )}
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-5 py-3 rounded transition-all inline-flex items-center gap-2"
              >
                Check Substack
              </a>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visiblePosts.map((post, idx) => (
                  <ScrollReveal key={post.guid} animation="fade-up" delay={idx * 100}>
                    <BlogPostCard post={post} />
                  </ScrollReveal>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all flex items-center gap-2"
                  >
                    <ChevronDown className="h-4 w-4" />
                    Load More Posts
                  </button>
                </div>
              )}

              {/* Footer CTA */}
              <div className="mt-16 text-center max-w-xl mx-auto">
                <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded p-8 flex flex-col items-center gap-4">
                  <p className="text-white font-bold uppercase tracking-wider text-xs">
                    Stay updated with our latest stories
                  </p>
                  <p className="text-xs text-[#555] max-w-xs leading-relaxed">
                    Subscribe to Win The Night on Substack to get new posts delivered straight to your inbox.
                  </p>
                  <a
                    href={SUBSTACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all flex items-center gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    Subscribe on Substack
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Blog;
