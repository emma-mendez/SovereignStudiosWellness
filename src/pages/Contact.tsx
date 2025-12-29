import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();
  
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'd like to book a consultation at Sovereign Lounge.");
    window.open(`https://wa.me/447983417736?text=${message}`, "_blank");
  };

  const openBooking = () => navigate("/consultation");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="gradient-secondary font-semibold uppercase tracking-wider text-sm">Get In Touch</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Book Your <span className="text-gradient-primary">Consultation</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to start your wellness journey? Get in touch with us to book your consultation 
              or treatment. We're here to help you achieve your goals.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* WhatsApp Card */}
            <div className="bg-gradient-card border border-border rounded-2xl p-8 text-center hover:border-primary transition-all hover:shadow-glow">
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="gradient-secondary-foreground" size={28} />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">WhatsApp Us</h2>
              <p className="text-muted-foreground mb-6">
                The fastest way to book! Send us a message and we'll respond within the hour.
              </p>
              <Button variant="whatsapp" size="lg" onClick={openWhatsApp} className="w-full">
                Chat on WhatsApp
              </Button>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gradient-card border border-border rounded-2xl p-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Contact Details</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="gradient-secondary" size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Whats App</div>
                    <div className="text-muted-foreground">Please Use The Whatsapp Link On The Left</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="gradient-secondary" size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-muted-foreground">bookings@sovereignwellnesslounge.co.uk</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="gradient-secondary" size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-muted-foreground">Birmingham, United Kingdom</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="gradient-secondary" size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Hours</div>
                    <div className="text-muted-foreground">Dates available are subject to request</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="font-display text-2xl md:text-3xl font-bold gradient-secondary-foreground mb-4">
              Not Sure Which Treatment Is Right For You?
            </h3>
            <p className="gradient-secondary-foreground/80 mb-6 max-w-xl mx-auto">
              Book a consultation and our experts will help you find the perfect treatment plan 
              tailored to your needs and goals.
            </p>
            <Button variant="default" size="xl" onClick={openBooking}>
              Book & Pay Deposit
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
