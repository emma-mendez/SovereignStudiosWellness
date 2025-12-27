import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { useNavigate } from "react-router-dom";
import bodyContouringImg from "@/assets/body-contouring.jpg";

const treatmentAreas = [
  "Buttocks",
  "Tummy",
  "Front Thighs",
  "Back Thighs",
  "Arms",
  "Flanks",
];

const includedTreatments = [
  "Laser Lipo",
  "Ultrasonic Cavitation",
  "Radio Frequency",
  "Vacuum suction & Lymphatic massage",
];

const bodyServices = [
  {
    title: "Body Contouring Single",
    description: "Single session body contouring treatment for one area",
    price: "£120",
    duration: "1hr per area",
    benefits: ["Radio Frequency", "Ultrasonic Cavitation", "Vacuum Suction", "Lymphatic Massage"],
    image: bodyContouringImg,
  },
  {
    title: "Body Contouring Course",
    description: "3 session course for visible and long-lasting results",
    price: "£350",
    duration: "5 sessions",
    benefits: ["Best value", "Visible results", "Long-lasting effects", "Full treatment protocol"],
    image: bodyContouringImg,
    isPopular: true,
  },
  {
    title: "Fat Reduction Single",
    description: "Targeted fat reduction treatment for 2 stubborn areas",
    price: "£200",
    duration: "1hr per area",
    benefits: ["Laser Lipo", "Ultrasonic Cavitation", "Radio Frequency", "Results driven"],
    image: bodyContouringImg,
  },
];

const BodyContouringPage = () => {
  const navigate = useNavigate();
  const openBooking = () => navigate("/consultation");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Advanced Treatments</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Body Contouring & <span className="text-gradient-secondary">Fat Reduction</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Our health and wellness lounge is equipped with devices offering the latest non-invasive, 
              results-driven solutions combining radio frequency, laser cavitation, and lymphatic drainage.
            </p>
          </div>

          {/* Info Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img 
                  src={bodyContouringImg} 
                  alt="Body Contouring Treatment" 
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-card p-6 rounded-xl shadow-elevated border border-border max-w-xs">
                <div className="text-primary text-4xl font-bold mb-2">4-in-1</div>
                <div className="text-foreground font-semibold">Revolutionary Treatment</div>
                <div className="text-muted-foreground text-sm mt-1">Combining RF, Cavitation, Vacuum & Massage</div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <p className="text-muted-foreground text-lg mb-6">
                This non-invasive, non-surgical body contouring machine will transform your body using the latest technology.
              </p>

              {/* Treatment Areas */}
              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">Treatment Areas</h3>
                <div className="flex flex-wrap gap-3">
                  {treatmentAreas.map((area) => (
                    <span 
                      key={area}
                      className="bg-accent/50 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">All Treatments Include</h3>
                <ul className="space-y-3">
                  {includedTreatments.map((treatment) => (
                    <li key={treatment} className="flex items-center gap-3 text-foreground">
                      <Check className="text-primary flex-shrink-0" size={20} />
                      {treatment}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info Box */}
              <div className="bg-accent/30 border border-primary/30 rounded-xl p-4 flex gap-3">
                <Info className="text-primary flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-muted-foreground">
                  All countouring treatments require a minimum course of 3 sessions for visible, long-lasting results. 
                  Maintenance treatments every 8-10 weeks recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
            Choose Your Treatment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bodyServices.map((service, index) => (
              <div 
                key={service.title} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard
                  {...service}
                  onBook={openBooking}
                />
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Not sure which treatment is right for you? Give us a call.</p>
            <Button variant="hero" size="xl" onClick={openBooking}>
              Book a Consultation
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BodyContouringPage;
