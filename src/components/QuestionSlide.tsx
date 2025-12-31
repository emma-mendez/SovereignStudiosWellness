import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuestionStep } from "@/lib/consultation-questions";
import { BookingCalendar } from "@/components/BookingCalendar";

interface QuestionSlideProps {
  question: QuestionStep;
  value: any;
  onChange: (value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentStep: number;
  totalSteps: number;
}

export const QuestionSlide = ({
  question,
  value,
  onChange,
  onNext,
  onPrev,
  isFirst,
  isLast,
  currentStep,
  totalSteps,
}: QuestionSlideProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const canProceed = () => {
    if (!question.required) return true;
    if (question.type === "checkbox") {
      return Array.isArray(value) && value.length > 0;
    }
    if (question.type === "date") {
      // For date type, we need both date and time
      return value?.date instanceof Date && value?.time;
    }
    if (question.type === "duration") {
      return value && value !== "";
    }
    return value && value !== "";
  };

  const handleNext = () => {
    if (canProceed()) {
      setIsAnimating(true);
      setTimeout(() => {
        onNext();
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleOptionSelect = (selectedValue: string) => {
    if (question.type === "radio" || question.type === "duration") {
      onChange(selectedValue);
      // Auto-advance for radio buttons and duration
      setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          onNext();
          setIsAnimating(false);
        }, 300);
      }, 300);
    }
  };

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (checked) {
      onChange([...currentValues, optionValue]);
    } else {
      onChange(currentValues.filter((v: string) => v !== optionValue));
    }
  };

  return (
    <div
      className={cn(
        "w-full transition-all duration-300 ease-out",
        isAnimating ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
      )}
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-muted-foreground">{question.subtitle}</p>
        )}
      </div>

      {/* Input */}
      <div className="max-w-md mx-auto mb-8">
        {question.type === "text" || question.type === "email" || question.type === "phone" ? (
          <Input
            type={question.type === "phone" ? "tel" : question.type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            className="text-center text-lg h-14 bg-card border-border"
            onKeyDown={(e) => {
              if (e.key === "Enter" && canProceed()) {
                handleNext();
              }
            }}
          />
        ) : question.type === "textarea" ? (
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            className="min-h-32 bg-card border-border"
          />
        ) : question.type === "radio" ? (
          <RadioGroup
            value={value || ""}
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                  value === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-card"
                )}
                onClick={() => handleOptionSelect(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer text-foreground">
                  {option.label}
                </Label>
                {value === option.value && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
            ))}
          </RadioGroup>
        ) : question.type === "checkbox" ? (
          <div className="space-y-3">
            {question.options?.map((option) => {
              const isChecked = Array.isArray(value) && value.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                    isChecked
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 bg-card"
                  )}
                  onClick={() => handleCheckboxChange(option.value, !isChecked)}
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(option.value, checked === true)
                    }
                  />
                  <Label className="flex-1 cursor-pointer text-foreground">
                    {option.label}
                  </Label>
                  {isChecked && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              );
            })}
          </div>
        ) : question.type === "date" ? (
          <BookingCalendar
            selectedDate={value?.date instanceof Date ? value.date : undefined}
            selectedTime={value?.time}
            onSelect={(date, time) => onChange({ date, time })}
          />
        ) : question.type === "duration" ? (
          <RadioGroup
            value={value || ""}
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                  value === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-card"
                )}
                onClick={() => handleOptionSelect(option.value)}
              >
                <RadioGroupItem value={option.value} id={`duration-${option.value}`} />
                <Label htmlFor={`duration-${option.value}`} className="flex-1 cursor-pointer text-foreground">
                  {option.label}
                </Label>
                {value === option.value && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
            ))}
          </RadioGroup>
        ) : null}
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrev}
          disabled={isFirst}
          className="group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>
        {question.type !== "radio" && question.type !== "duration" && (
          <Button
            variant="hero"
            size="lg"
            onClick={handleNext}
            disabled={question.required && !canProceed()}
            className="group"
          >
            {isLast ? "Review" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </div>
    </div>
  );
};