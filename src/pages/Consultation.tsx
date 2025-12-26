import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, User, Camera } from "lucide-react";

const ConsultationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              Pre-Consultation
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-8">
              Begin Your <span className="text-gradient-primary">Wellness Journey</span>
            </h1>

            {/* Introduction Text */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-12 text-left">
              <p className="text-foreground leading-relaxed mb-6">
                At Sovereign Studios, wellness is approached with intention, presence and respect 
                for the body as a living system.
              </p>
              <p className="text-foreground leading-relaxed mb-6">
                Each session is curated rather than standardised. The environment, touch and pacing 
                are prepared in advance so that when you arrive, the space is already set to support 
                your nervous system and physical needs.
              </p>
              <p className="text-foreground leading-relaxed mb-6">
                To maintain the integrity of this work, sessions are offered selectively and are not 
                suitable for everyone. This brief pre-consultation allows us to understand whether 
                this offering is aligned for you, and if so, how to prepare the studio in a way that 
                best supports your body on the day.
              </p>
              <p className="text-foreground leading-relaxed mb-6">
                All sessions are professional, non-sexual and grounded in care, consent and clear boundaries.
              </p>
              <p className="text-muted-foreground italic">
                Please answer honestly and thoughtfully. Your responses are held in confidence and 
                used solely to prepare your session.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/consultation/form">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  <User className="mr-2 h-5 w-5" />
                  Begin Consultation
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/consultation/model-request">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto group">
                  <Camera className="mr-2 h-5 w-5" />
                  Model Session Request
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultationPage;
