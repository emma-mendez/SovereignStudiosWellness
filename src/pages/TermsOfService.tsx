import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-12">Effective Date: [01/01/2026]</p>
          
          <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
            <p>
              These Terms of Service govern the provision of services by Sovereign Studios Health & Wellness. 
              By booking or attending a session, you agree to these terms.
            </p>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">1. Nature of Services</h2>
              <p>
                All services offered are professional, therapeutic and non-sexual in nature. Treatments are 
                provided for relaxation, wellbeing and general muscle care only and do not constitute medical 
                diagnosis or treatment.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">2. Eligibility and Suitability</h2>
              <p>
                Services are offered selectively and may not be suitable for all individuals. Clients must 
                complete a pre-consultation honestly and disclose relevant health information. Sovereign Studios 
                reserves the right to decline or discontinue a session if it is deemed inappropriate or unsafe.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">3. Professional Boundaries</h2>
              <p>
                Clear boundaries are maintained at all times. Any inappropriate behaviour, requests or language 
                will result in immediate termination of the session, with payment forfeited where applicable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">4. Consent</h2>
              <p>
                Informed consent is obtained prior to treatment. Consent may be withdrawn at any point during 
                the session.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">5. Bookings and Cancellations</h2>
              <p>Sessions are by appointment only.</p>
              <p>
                A £20 booking fee is required to secure all appointments. This booking fee is non-refundable 
                under all circumstances.
              </p>
              <p>
                Rescheduling may be offered without loss of the booking fee where a minimum of 48 hours' notice 
                is provided prior to the scheduled appointment time.
              </p>
              <p>
                Cancellations or rescheduling requests made with less than 48 hours' notice, or failure to attend 
                an appointment, will result in forfeiture of the booking fee. Additional charges may apply where 
                preparation time or session allocation has been impacted.
              </p>
              <p>
                All cancellation and rescheduling requests must be made in writing via{" "}
                <a 
                  href="mailto:booking@sovereignwellnesslounge.co.uk" 
                  className="text-primary hover:underline"
                >
                  booking@sovereignwellnesslounge.co.uk
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">6. Payments</h2>
              <p>
                Payment terms, fees and accepted payment methods will be clearly stated prior to booking. 
                All payments must be made in accordance with the agreed terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">7. Liability</h2>
              <p>
                Sovereign Studios is not liable for injury, loss or damage resulting from inaccurate or 
                incomplete information provided by the client, or from failure to follow aftercare advice.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">8. Confidentiality</h2>
              <p>
                All client information, discussions and records are treated as confidential, except where 
                disclosure is required by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">9. Amendments</h2>
              <p>
                Sovereign Studios reserves the right to update these Terms of Service at any time. The most 
                current version will apply to all bookings.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">10. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of England and Wales.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
