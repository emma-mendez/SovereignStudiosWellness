import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, ArrowLeft } from "lucide-react";

const ModelRequestPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm block text-center">
              Model Session
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-8 text-center">
              Model Session <span className="text-gradient-primary">Request</span>
            </h1>

            {/* Information Box */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-8">
              <p className="text-foreground leading-relaxed mb-6">
                From time to time, Sovereign Studios offers a reduced rate for sessions provided on 
                a model basis. These sessions support training, documentation, content creation and 
                the ongoing development of our wellness practice.
              </p>
              <p className="text-foreground leading-relaxed font-semibold">
                By selecting a model session, you acknowledge and agree to the following terms in 
                full before entering the consultation phase.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="xl" 
                className="group"
                onClick={() => navigate("/consultation")}
              >
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Cancel
              </Button>
              <Link to="/consultation/model-terms">
                <Button variant="hero" size="xl" className="w-full group">
                  Continue to Terms
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

export default ModelRequestPage;
