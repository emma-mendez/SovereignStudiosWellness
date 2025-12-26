import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import hairImg from "@/assets/hair-braiding.jpg";

const kidsStyles = [
  { name: "Upstyle", price: "From £25", description: "Beautiful upstyles for special occasions" },
  { name: "Box Braids", price: "From £40", description: "Protective box braids in various sizes" },
  { name: "Beads & Braids", price: "From £35", description: "Adorable braided styles with colorful beads" },
  { name: "Half Up Half Down", price: "From £30", description: "Versatile half up styles for everyday or occasions" },
];

const adultStyles = [
  { name: "Weave Pattern", price: "From £50", description: "Professional weave patterns for seamless installs" },
  { name: "Locs Retwists", price: "From £60", description: "Professional loc maintenance and retwisting" },
  { name: "Braid Back for Glueless Wigs", price: "From £35", description: "Flat braided foundation for wig application" },
];

const HairPage = () => {
  const navigate = useNavigate();
  const openBooking = () => navigate("/consultation");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Expert Styling</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Hair Styling & <span className="text-gradient-primary">Braiding</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              From protective styles to special occasion looks, our expert stylists create 
              beautiful, long-lasting hairstyles for both kids and adults.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img 
                src={hairImg} 
                alt="Hair Braiding Services" 
                className="w-full h-auto"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
          </div>

          {/* Kids Styles */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-3">
              <span className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-lg">K</span>
              Kids Styles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kidsStyles.map((style, index) => (
                <div 
                  key={style.name}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-glow animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="font-display text-xl font-semibold text-foreground mb-2">{style.name}</div>
                  <div className="text-primary text-2xl font-bold mb-3">{style.price}</div>
                  <p className="text-muted-foreground text-sm">{style.description}</p>
                  <Button variant="outline" className="w-full mt-4" onClick={openBooking}>
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Adult Styles */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-3">
              <span className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg">A</span>
              Adult Styles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {adultStyles.map((style, index) => (
                <div 
                  key={style.name}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-glow animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="font-display text-xl font-semibold text-foreground mb-2">{style.name}</div>
                  <div className="text-primary text-2xl font-bold mb-3">{style.price}</div>
                  <p className="text-muted-foreground text-sm">{style.description}</p>
                  <Button variant="outline" className="w-full mt-4" onClick={openBooking}>
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready for Your New Look?
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Book your hair appointment today and let our expert stylists transform your look.
            </p>
            <Button variant="secondary" size="xl" onClick={openBooking}>
              Book Hair Appointment
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HairPage;
