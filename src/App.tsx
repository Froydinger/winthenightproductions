import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AudioProvider } from "@/context/AudioContext";
// Lazy load route components for better performance
const Index = lazy(() => import("./pages/Index"));
const BeOurGuest = lazy(() => import("./pages/BeOurGuest"));
const Support = lazy(() => import("./pages/Support"));
const CrisisResources = lazy(() => import("./pages/CrisisResources"));
const Watch = lazy(() => import("./pages/Watch"));
const ChapterPage = lazy(() => import("./pages/ChapterPage"));
const Admin = lazy(() => import("./pages/Admin"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Updates = lazy(() => import("./pages/Updates"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Listen = lazy(() => import("./pages/Listen"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading skeleton component for better perceived performance
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse space-y-4 text-center">
      <div className="w-40 h-40 mx-auto bg-neon-blue/20 rounded-full" />
      <div className="h-8 bg-foreground/10 rounded w-64 mx-auto" />
      <div className="h-4 bg-foreground/10 rounded w-48 mx-auto" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AudioProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSkeleton />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/guest" element={<BeOurGuest />} />
              {/* Redirect old guest routes to /guest */}
              <Route path="/be-our-guest" element={<Navigate to="/guest" replace />} />
              <Route path="/be-ourguest" element={<Navigate to="/guest" replace />} />
              <Route path="/support" element={<Support />} />
              <Route path="/crisis-resources" element={<CrisisResources />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/watch/:chapterId" element={<ChapterPage />} />
              <Route path="/listen" element={<Listen />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AudioProvider>
  </QueryClientProvider>
);

export default App;
