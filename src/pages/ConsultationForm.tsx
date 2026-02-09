import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuestionSlide } from "@/components/QuestionSlide";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { consultationQuestions } from "@/lib/consultation-questions";
import {
  ConsultationFormData,
  defaultFormValues,
  isFieldFilled,
} from "@/lib/consultation-schema";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SETMORE_BOOKING_LINK = "https://sovereignwellnesslounge.setmore.com/emma";

// Helper to format time label
const formatTimeLabel = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

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

  // Track pending auto-advance for radio/duration questions
  const pendingAutoAdvance = useRef<string | null>(null);

  const questions = consultationQuestions;
  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep] || questions[questions.length - 1];

  // Compute whether the current step can proceed
  const canProceed = isFieldFilled(
    currentQuestion.type,
    formData[currentQuestion.field as keyof ConsultationFormData],
    !!currentQuestion.required
  );

  // Handle value change - parent owns all state updates
  const handleValueChange = useCallback(
    (field: string, value: any) => {
      setFormData((prev) => {
        const updated = { ...prev, [field]: value };
        return updated;
      });

      // For radio and duration, mark pending auto-advance
      const question = questions.find((q) => q.field === field);
      if (question && (question.type === "radio" || question.type === "duration")) {
        pendingAutoAdvance.current = field;
      }
    },
    [questions]
  );

  // Effect: auto-advance for radio/duration AFTER state has settled
  useEffect(() => {
    if (!pendingAutoAdvance.current) return;

    const field = pendingAutoAdvance.current;
    const question = questions.find((q) => q.field === field);
    if (!question) {
      pendingAutoAdvance.current = null;
      return;
    }

    const value = formData[field as keyof ConsultationFormData];
    const filled = isFieldFilled(question.type, value, !!question.required);

    if (filled) {
      pendingAutoAdvance.current = null;
      // Small delay to show selection highlight before advancing
      const timer = setTimeout(() => {
        advanceStep();
      }, 350);
      return () => clearTimeout(timer);
    }

    pendingAutoAdvance.current = null;
  }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

  const advanceStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowReview(true);
    }
  };

  const handleNext = () => {
    if (!canProceed) return;
    advanceStep();
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

    try {
      const { data, error } = await supabase.functions.invoke(
        "send-consultation-email",
        { body: formData }
      );

      if (error) {
        console.error("Edge function invocation error:", error);
        throw error;
      }

      // Check response payload for success
      if (data && data.success === false) {
        console.error("Edge function returned failure:", data);
        throw new Error(data.error || "Submission failed");
      }

      console.log("Form submitted and email sent:", data);

      setIsSubmitted(true);
      toast({
        title: "Consultation Submitted!",
        description: "Your consultation form has been received.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
        description:
          "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openBooking = () => {
    window.open(SETMORE_BOOKING_LINK, "_blank");
  };

  // ─── Submitted State ────────────────────────────────────────────────
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
                Consultation{" "}
                <span className="text-gradient-primary">Received</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for completing your consultation form. Click below to
                book your appointment.
              </p>
              <Button
                variant="hero"
                size="xl"
                onClick={openBooking}
                className="group"
              >
                Book Now
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                After booking, return here for our thank you page with app
                download.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Review State ───────────────────────────────────────────────────
  if (showReview) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Review Your{" "}
                <span className="text-gradient-primary">Consultation</span>
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                Please review your responses before submitting.
              </p>

              {/* Summary */}
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8 space-y-4">
                {questions.map((q) => {
                  const val =
                    formData[q.field as keyof ConsultationFormData];
                  if (
                    !val ||
                    (Array.isArray(val) && val.length === 0)
                  )
                    return null;

                  let displayValue: string;

                  // Handle date type with time
                  if (
                    q.type === "date" &&
                    val &&
                    typeof val === "object" &&
                    "date" in val
                  ) {
                    const dateVal = val as {
                      date?: Date;
                      time?: string;
                    };
                    if (dateVal.date instanceof Date) {
                      const timeLabel = dateVal.time
                        ? ` at ${formatTimeLabel(dateVal.time)}`
                        : "";
                      displayValue =
                        format(dateVal.date, "EEEE, MMMM d, yyyy") +
                        timeLabel;
                    } else {
                      return null;
                    }
                  } else if (q.type === "duration" && q.options) {
                    displayValue =
                      q.options.find((o) => o.value === val)?.label ||
                      String(val);
                  } else if (Array.isArray(val)) {
                    if (q.options) {
                      displayValue = val
                        .map(
                          (v) =>
                            q.options?.find((o) => o.value === v)
                              ?.label || v
                        )
                        .join(", ");
                    } else {
                      displayValue = val.join(", ");
                    }
                  } else if (q.options) {
                    displayValue =
                      q.options.find((o) => o.value === val)?.label ||
                      String(val);
                  } else {
                    displayValue = String(val);
                  }

                  return (
                    <div
                      key={q.id}
                      className="border-b border-border pb-3 last:border-0"
                    >
                      <p className="text-sm text-muted-foreground">
                        {q.title}
                      </p>
                      <p className="text-foreground font-medium">
                        {displayValue}
                      </p>
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
                    onCheckedChange={(checked) =>
                      setCancellationConsent(checked === true)
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="cancellation"
                    className="text-foreground cursor-pointer"
                  >
                    I understand cancellations under 24 hours are
                    non-refundable and sessions are strictly professional.
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrev}
                  className="group"
                >
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

  // ─── Question Slide State ──────────────────────────────────────────
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
              value={
                formData[
                  currentQuestion.field as keyof ConsultationFormData
                ]
              }
              onChange={(value) =>
                handleValueChange(currentQuestion.field, value)
              }
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={currentStep === 0}
              isLast={currentStep === totalSteps - 1}
              currentStep={currentStep + 1}
              totalSteps={totalSteps}
              canProceed={canProceed}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultationFormPage;
