import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MassagePage from "./pages/Massage";
import BodyContouringPage from "./pages/BodyContouring";
import HairPage from "./pages/Hair";
import ContactPage from "./pages/Contact";
import ConsultationPage from "./pages/Consultation";
import ModelRequestPage from "./pages/ModelRequest";
import ModelTermsPage from "./pages/ModelTerms";
import ConsultationFormPage from "./pages/ConsultationForm";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/massage" element={<MassagePage />} />
          <Route path="/body-contouring" element={<BodyContouringPage />} />
          {/* <Route path="/hair" element={<HairPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/consultation/model-request" element={<ModelRequestPage />} />
          <Route path="/consultation/model-terms" element={<ModelTermsPage />} />
          <Route path="/consultation/form" element={<ConsultationFormPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
