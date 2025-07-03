
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
import { BotDetails } from "./pages/BotDetails";
import { BotEditor } from "./pages/BotEditor";
import { BotBuilder } from "./pages/BotBuilder";
import { ActivityPage } from "./pages/ActivityPage";
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
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/bots/new" element={<BotBuilder />} />
            <Route path="/bots/:id" element={<BotDetails />} />
            <Route path="/bots/:id/edit" element={<BotEditor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
