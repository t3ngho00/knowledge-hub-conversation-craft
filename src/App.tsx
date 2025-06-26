
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Bots } from "./pages/Bots";
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
            <Route 
              path="/knowledge" 
              element={
                <PlaceholderPage 
                  title="Knowledge Hub" 
                  description="Manage your bot's knowledge base, upload documents, and configure data sources"
                />
              } 
            />
            <Route 
              path="/review" 
              element={
                <PlaceholderPage 
                  title="Answer Review" 
                  description="Review flagged conversations and improve your bot's responses with human oversight"
                />
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <PlaceholderPage 
                  title="Analytics & Insights" 
                  description="Track your bot's performance, conversation metrics, and identify improvement opportunities"
                />
              } 
            />
            <Route 
              path="/channels" 
              element={
                <PlaceholderPage 
                  title="Channels & Integrations" 
                  description="Connect your bots to messaging platforms and external systems"
                />
              } 
            />
            <Route 
              path="/settings" 
              element={
                <PlaceholderPage 
                  title="Settings" 
                  description="Manage your workspace, users, billing, and account preferences"
                />
              } 
            />
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
