
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Bots } from "./pages/Bots";
import { KnowledgeHub } from "./pages/KnowledgeHub";
import { AnswerReview } from "./pages/AnswerReview";
import { Analytics } from "./pages/Analytics";
import { Channels } from "./pages/Channels";
import { Settings } from "./pages/Settings";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bots" element={<Bots />} />
            <Route path="/knowledge" element={<KnowledgeHub />} />
            <Route path="/review" element={<AnswerReview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/bots/new" element={<PlaceholderPage title="Bot Builder" description="Create and configure your new chatbot with our visual flow builder" />} />
            <Route path="/bots/:id" element={<PlaceholderPage title="Bot Details" description="View and manage your bot's configuration and performance" />} />
            <Route path="/bots/:id/edit" element={<PlaceholderPage title="Bot Editor" description="Edit your bot's conversation flow and settings" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
