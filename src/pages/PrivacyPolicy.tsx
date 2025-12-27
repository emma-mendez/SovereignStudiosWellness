import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">Effective Date: [01/01/2026]</p>
          
          <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
            <p>
              Sovereign Studios Health & Wellness ("Sovereign Studios", "we", "our", "us") is committed to 
              protecting your privacy and handling your personal information with care, transparency and 
              integrity. This Privacy Policy explains how we collect, use, store and protect your information 
              in accordance with UK data protection law, including the UK General Data Protection Regulation 
              (UK GDPR).
            </p>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p>We may collect and process the following information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Personal details such as name, email address and contact information</li>
                <li>Health and wellbeing information provided during pre-consultation or intake forms</li>
                <li>Booking and appointment details</li>
                <li>Communications between you and Sovereign Studios</li>
              </ul>
              <p className="mt-4">
                Health-related information is treated as special category data and handled with heightened 
                confidentiality.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">2. How Your Information Is Used</h2>
              <p>Your information is collected solely for the purposes of:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Assessing suitability for treatments</li>
                <li>Preparing and delivering your massage or wellness session</li>
                <li>Managing bookings and communication</li>
                <li>Meeting legal, regulatory or insurance obligations</li>
              </ul>
              <p className="mt-4">
                Your information will never be sold, shared or used for marketing without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">3. Lawful Basis for Processing</h2>
              <p>We process personal data on the basis of:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Your explicit consent</li>
                <li>Contractual necessity (to deliver services you request)</li>
                <li>Legal or professional obligations</li>
              </ul>
              <p className="mt-4">
                You may withdraw consent at any time, subject to legal or record-keeping requirements.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">4. Data Storage and Security</h2>
              <p>
                All personal data is stored securely, whether digitally or in physical form. Access is 
                restricted to authorised persons only. Reasonable technical and organisational measures 
                are in place to prevent unauthorised access, loss or misuse.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">5. Data Retention</h2>
              <p>
                Information is retained only for as long as necessary to fulfil the purposes outlined above, 
                or as required by law, insurance or professional standards.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (where legally permissible)</li>
                <li>Object to or restrict certain processing</li>
                <li>Lodge a complaint with the Information Commissioner's Office (ICO)</li>
              </ul>
              <p className="mt-4">
                Requests can be made by contacting Sovereign Studios directly.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
