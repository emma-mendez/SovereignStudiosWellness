import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import massageImg from "@/assets/massage-card.jpg";
import bodyContouringImg from "@/assets/body-contouring.jpg";
import hairImg from "@/assets/hair-braiding.jpg";

const services = [
  {
    title: "Massage & Wellness",
    description: "From lymphatic drainage to deep tissue, experience rejuvenating massage therapies that restore your body and mind.",
    image: massageImg,
    link: "/massage",
    highlights: ["Lymphatic Drainage", "Deep Tissue", "Hot Stone"],
  },
  {
    title: "Body Contouring",
    description: "Advanced non-invasive treatments using radio frequency and cavitation for fat reduction and body sculpting.",
    image: bodyContouringImg,
    link: "/body-contouring",
    highlights: ["Fat Reduction", "Cellulite Treatment", "Skin Tightening"],
  },
  // {
  //   title: "Hair Styling",
  //   description: "Expert hair braiding and styling services for kids and adults, from box braids to locs retwists.",
  //   image: hairImg,
  //   link: "/hair",
  //   highlights: ["Box Braids", "Locs Retwists", "Weave Patterns", "Kids Styles"],
  // },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* Services Overview Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">Our Services</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
                Transform Your <span className="text-gradient-primary">Body & Mind</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover our full range of wellness services designed to help you look and feel your best.
              </p>
            </div>

            {/* Services Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Link 
                  key={service.title} 
                  to={service.link}
                  className="group animate-fade-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="bg-gradient-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-all duration-500 hover:shadow-elevated hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.highlights.map((highlight) => (
                          <span 
                            key={highlight}
                            className="bg-accent/50 text-accent-foreground px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Link */}
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        View Services
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
