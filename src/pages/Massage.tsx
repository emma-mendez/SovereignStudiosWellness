import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ServiceCard } from "@/components/ServiceCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import massageImg from "@/assets/massage-card.jpg";

const massageServices = [
  {
    title: "Lymphatic Drainage",
    description: "Detoxifying massage to reduce fluid retention and boost immunity",
    price: "£150",
    duration: "60 mins",
    benefits: ["Reduces swelling", "Boosts immunity", "Detoxifies body", "Improves circulation"],
    image: massageImg,
    isPopular: true,
  },
  {
    title: "Body Contouring Massage",
    description: "Sculpting massage for body shaping and cellulite reduction",
    price: "£150",
    duration: "60 mins",
    benefits: ["Shapes body", "Reduces cellulite", "Tones skin", "Improves appearance"],
    image: massageImg,
  },
  {
    title: "Relaxing Massage",
    description: "Gentle full body massage for ultimate relaxation",
    price: "£90",
    duration: "60 mins",
    benefits: ["Stress relief", "Muscle relaxation", "Improved sleep", "Mental clarity"],
    image: massageImg,
  },
  {
    title: "Deep Tissue Massage",
    description: "Intensive massage targeting deep muscle tension",
    price: "£100",
    duration: "60 mins",
    benefits: ["Relieves chronic pain", "Breaks up scar tissue", "Improves mobility", "Reduces tension"],
    image: massageImg,
  },
  // {
  //   title: "Hot Stone Massage",
  //   description: "Heated stones combined with massage for deep relaxation",
  //   price: "£120",
  //   duration: "60 mins",
  //   benefits: ["Deep muscle relief", "Improves circulation", "Reduces stress", "Eases pain"],
  //   image: massageImg,
  // },
  {
    title: "Aromatherapy Massage",
    description: "Essential oil massage for body and mind wellness",
    price: "£100",
    duration: "60 mins",
    benefits: ["Mood enhancement", "Stress reduction", "Skin nourishment", "Relaxation"],
    image: massageImg,
  },
];

const MassagePage = () => {
  const navigate = useNavigate();
  const openBooking = () => navigate("/consultation");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Massage & Wellness</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Massage & <span className="text-gradient-primary">Lymphatic Drainage</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              From deep tissue to relaxation, our expert therapists offer a wide range of massage 
              treatments to rejuvenate your body and mind.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {massageServices.map((service, index) => (
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
            <p className="text-muted-foreground mb-6">Not sure which treatment is right for you?</p>
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

export default MassagePage;
