import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-massage.jpg";
import logo from "@/assets/logo.png";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Animation */}
          <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <img 
              src={logo} 
              alt="Sovereign Lounge" 
              className="h-32 md:h-40 w-auto mx-auto animate-float"
            />
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Your Journey to{" "}
            <span className="text-gradient-primary">Wellness</span>{" "}
            Begins Here
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Experience transformative massage therapy and advanced body contouring treatments at Birmingham's premier health and wellness lounge.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/massage">
              <Button variant="hero" size="xl">
                Explore Services
              </Button>
            </Link>
            <Link to="/consultation">
              <Button variant="heroOutline" size="xl">
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div 
            className="pb-14 pt-3 grid grid-cols-3 gap-3 max-w-lg mx-auto animate-fade-up "
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">02+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">5+</div>
              <div className="text-sm text-muted-foreground">Treatments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">5★</div>
              <div className="text-sm text-muted-foreground">Rated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 animate-bounce">
        <div className=" w-6 h-8 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
