import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Download, Home } from "lucide-react";

const SETMORE_APP_LINK = "https://sovereignwellnesslounge.setmore.com/app?source=settings-app-popup";

const ThankYouPage = () => {
  const openApp = () => {
    window.open(SETMORE_APP_LINK, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thank You for <span className="text-gradient-primary">Booking</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Your consultation and booking have been received. We look forward to seeing you soon!
            </p>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8">
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Easy Rebooking
              </h3>
              <p className="text-muted-foreground mb-4">
                Download our app for quick and easy future bookings, appointment reminders, and exclusive offers.
              </p>
              <Button variant="hero" size="lg" onClick={openApp} className="group w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" />
                Download App
              </Button>
            </div>

            <Link to="/">
              <Button variant="outline" size="lg" className="group">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
