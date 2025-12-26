import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft } from "lucide-react";

const ModelTermsPage = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm block text-center">
              Model Session
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-8 text-center">
              Terms of <span className="text-gradient-primary">Participation</span>
            </h1>

            {/* Terms Content */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-8 space-y-8">
              {/* Use of Images */}
              <section>
                <h2 className="text-xl font-bold text-primary mb-4">USE OF IMAGES, VIDEO & AUDIO</h2>
                <ul className="space-y-3 text-foreground">
                  <li>• I understand that my session may be photographed, filmed and/or recorded for professional use.</li>
                  <li>• This may include, but is not limited to, marketing materials, website content, social media, educational resources and internal documentation.</li>
                  <li>• I grant Sovereign Studios full, irrevocable permission to use this content without limitation, compensation or requirement for approval.</li>
                  <li>• I understand that once content is published, it may remain in circulation indefinitely.</li>
                </ul>
              </section>

              <hr className="border-border" />

              {/* Consent & Representation */}
              <section>
                <h2 className="text-xl font-bold text-primary mb-4">CONSENT & REPRESENTATION</h2>
                <ul className="space-y-3 text-foreground">
                  <li>• I confirm that I am participating voluntarily and have disclosed any relevant information that may affect my session.</li>
                  <li>• I understand that results from bodywork vary and no specific outcome is guaranteed.</li>
                  <li>• I acknowledge that the discounted rate reflects my role as a model and the associated permissions granted.</li>
                </ul>
              </section>

              <hr className="border-border" />

              {/* Liability & Waiver */}
              <section>
                <h2 className="text-xl font-bold text-primary mb-4">LIABILITY & WAIVER</h2>
                <ul className="space-y-3 text-foreground">
                  <li>• I agree to release and hold harmless Sovereign Studios, its practitioners and representatives from any claims, demands, or liability arising from participation in a model session.</li>
                  <li>• This includes, but is not limited to, physical responses, emotional responses, dissatisfaction with results, or perceived outcomes.</li>
                </ul>
              </section>

              <hr className="border-border" />

              {/* Public Commentary */}
              <section>
                <h2 className="text-xl font-bold text-primary mb-4">PUBLIC COMMENTARY & DISPUTE HANDLING</h2>
                <ul className="space-y-3 text-foreground">
                  <li>• I agree not to pursue public complaints, negative reviews, social media commentary or reputational harm in relation to my model session.</li>
                  <li>• Any concerns must be raised privately and directly with Sovereign Studios to allow for appropriate review and resolution.</li>
                  <li>• I understand that public complaints following acceptance of these terms constitute a breach of agreement.</li>
                </ul>
              </section>

              <hr className="border-border" />

              {/* Professional Boundaries */}
              <section>
                <h2 className="text-xl font-bold text-primary mb-4">PROFESSIONAL BOUNDARIES</h2>
                <ul className="space-y-3 text-foreground">
                  <li>• All sessions are strictly professional and non-sexual.</li>
                  <li>• Any inappropriate behaviour, comments or boundary violations will result in immediate termination of the session without refund and exclusion from future offerings.</li>
                </ul>
              </section>

              <hr className="border-border" />

              {/* Right to Decline */}
              <section>
                <h2 className="text-xl font-bold text-primary mb-4">RIGHT TO DECLINE OR TERMINATE</h2>
                <ul className="space-y-3 text-foreground">
                  <li>• Sovereign Studios reserves the right to decline or terminate a model session at any stage if alignment, safety or boundaries are compromised.</li>
                  <li>• Acceptance of this agreement does not guarantee approval to proceed beyond consultation.</li>
                </ul>
              </section>

              <hr className="border-border" />

              {/* Acknowledgement */}
              <section>
                <h2 className="text-xl font-bold text-primary mb-4">ACKNOWLEDGEMENT</h2>
                <p className="text-foreground mb-4">By selecting a model session and proceeding, I confirm that:</p>
                <ul className="space-y-3 text-foreground mb-6">
                  <li>• I have read and understood all terms above</li>
                  <li>• I agree to participate under these conditions</li>
                  <li>• I accept that these terms are binding prior to consultation</li>
                </ul>

                <p className="text-muted-foreground text-sm italic mb-6">
                  Please note: selecting a model session is optional. Full-rate private sessions do 
                  not require participation in media or documentation.
                </p>

                {/* Checkbox */}
                <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-primary/30">
                  <Checkbox 
                    id="agree-terms"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                    className="mt-1"
                  />
                  <label 
                    htmlFor="agree-terms" 
                    className="text-foreground font-semibold cursor-pointer"
                  >
                    I agree to the Model Session Terms of Participation
                  </label>
                </div>
              </section>
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
              <Link to="/consultation/form?type=model">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full group"
                  disabled={!agreed}
                >
                  Continue to Consultation
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

export default ModelTermsPage;
