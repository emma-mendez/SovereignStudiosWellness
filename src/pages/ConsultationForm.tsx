import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuestionSlide } from "@/components/QuestionSlide";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { consultationQuestions } from "@/lib/consultation-questions";
import { ConsultationFormData, defaultFormValues } from "@/lib/consultation-schema";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/8x27sLdrH5UAaHvcsX7wA03";

const ConsultationFormPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isModelSession = searchParams.get("type") === "model";

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ConsultationFormData>>({
    ...defaultFormValues,
    isModelSession,
  });
  const [showReview, setShowReview] = useState(false);
  const [cancellationConsent, setCancellationConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = consultationQuestions;
  const totalSteps = questions.length;

  const handleValueChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowReview(true);
    }
  };

  const handlePrev = () => {
    if (showReview) {
      setShowReview(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!cancellationConsent) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the cancellation policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission (in real app, this would send to Google Drive via API)
    try {
      // For now, we'll just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", { ...formData, cancellationConsent });
      
      setIsSubmitted(true);
      toast({
        title: "Consultation Submitted!",
        description: "Your consultation form has been received. Redirecting to payment...",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openPayment = () => {
    window.open(STRIPE_PAYMENT_LINK, "_blank");
  };

  if (isSubmitted) {
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
                Consultation <span className="text-gradient-primary">Received</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for completing your consultation form. To secure your booking, 
                please proceed with the deposit payment below.
              </p>
              <Button variant="hero" size="xl" onClick={openPayment} className="group">
                Proceed to Payment
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Review Your <span className="text-gradient-primary">Consultation</span>
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                Please review your responses before submitting.
              </p>

              {/* Summary */}
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8 space-y-4">
                {questions.map((q) => {
                  const val = formData[q.field as keyof ConsultationFormData];
                  if (!val || (Array.isArray(val) && val.length === 0)) return null;
                  
                  let displayValue = val;
                  if (Array.isArray(val)) {
                    displayValue = val.join(", ");
                  }
                  if (q.options) {
                    if (Array.isArray(val)) {
                      displayValue = val
                        .map((v) => q.options?.find((o) => o.value === v)?.label || v)
                        .join(", ");
                    } else {
                      displayValue = q.options.find((o) => o.value === val)?.label || val;
                    }
                  }

                  return (
                    <div key={q.id} className="border-b border-border pb-3 last:border-0">
                      <p className="text-sm text-muted-foreground">{q.title}</p>
                      <p className="text-foreground font-medium">{String(displayValue)}</p>
                    </div>
                  );
                })}
              </div>

              {/* Cancellation Consent */}
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="cancellation"
                    checked={cancellationConsent}
                    onCheckedChange={(checked) => setCancellationConsent(checked === true)}
                    className="mt-1"
                  />
                  <label htmlFor="cancellation" className="text-foreground cursor-pointer">
                    I understand cancellations under 24 hours are non-refundable and sessions 
                    are strictly professional.
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button variant="outline" size="lg" onClick={handlePrev} className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Edit Responses
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!cancellationConsent || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Consultation"}
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            {isModelSession && (
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
                  Model Session
                </span>
              </div>
            )}
            <QuestionSlide
              question={currentQuestion}
              value={formData[currentQuestion.field as keyof ConsultationFormData]}
              onChange={(value) => handleValueChange(currentQuestion.field, value)}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={currentStep === 0}
              isLast={currentStep === totalSteps - 1}
              currentStep={currentStep + 1}
              totalSteps={totalSteps}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultationFormPage;
