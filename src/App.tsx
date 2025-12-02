import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load route components for better performance
const Index = lazy(() => import("./pages/Index"));
const BeOurGuest = lazy(() => import("./pages/BeOurGuest"));
const GuestPortal = lazy(() => import("./pages/GuestPortal"));
const Support = lazy(() => import("./pages/Support"));
const CrisisResources = lazy(() => import("./pages/CrisisResources"));
const Watch = lazy(() => import("./pages/Watch"));
const ChapterPage = lazy(() => import("./pages/ChapterPage"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Updates = lazy(() => import("./pages/Updates"));
const Setup = lazy(() => import("./pages/Setup"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/guest" element={<BeOurGuest />} />
            <Route path="/be-our-guest" element={<GuestPortal />} />
            <Route path="/support" element={<Support />} />
            <Route path="/crisis-resources" element={<CrisisResources />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/watch/:chapterId" element={<ChapterPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/setup" element={<Setup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
