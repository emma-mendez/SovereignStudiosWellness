import { z } from "zod";

export const consultationFormSchema = z.object({
  // Basic Info
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),

  // Session type
  isModelSession: z.boolean().default(false),

  // Medical History
  previousBodywork: z.enum(["yes", "no"]),
  underMedicalCare: z.enum(["yes", "no"]),
  medicalConditions: z.array(z.string()),
  additionalNotes: z.string().optional(),

  // Booking Reason
  primaryReason: z.string(),

  // Consent
  understandsProfessional: z.enum(["yes", "no"]),
  comfortableStudioEnvironment: z.enum(["yes", "no"]),

  // Preferences
  roomTemperature: z.enum(["cool", "warm", "hot"]),
  scentPreference: z.enum(["none", "lemongrass", "lavender"]),
  pressurePreference: z.enum(["light", "medium", "deep"]),
  focusAreas: z.array(z.string()),
  avoidAreas: z.string().optional(),

  // Intent
  desiredFeelings: z.array(z.string()),

  // Demographics
  gender: z.enum(["female", "male", "prefer-not-to-say"]),
  ageGroup: z.enum(["18-25", "26-35", "36-45", "46-55", "55+"]),
  weightCategory: z.enum(["under-70kg", "70-90kg", "90kg+"]),
  bodyType: z.enum(["petite", "average", "athletic", "curvy", "broad"]).optional(),

  // Session Preferences
  consentStyle: z.enum(["verbal-check-ins", "minimal-talking"]),
  soundPreference: z.enum(["silence", "ambient-music", "nature-sounds"]),
  wantsAftercareAdvice: z.enum(["yes", "no"]),

  // Session Duration and Booking
  sessionDuration: z.enum(["30", "60", "90", "120"]),
  preferredDate: z.date().optional(),
  preferredTime: z.string().optional(),

  // Final Consent
  cancellationConsent: z.boolean().refine((val) => val === true, "You must agree to the cancellation policy"),
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;

export const defaultFormValues: Partial<ConsultationFormData> = {
  name: "",
  email: "",
  phone: "",
  isModelSession: false,
  medicalConditions: [],
  additionalNotes: "",
  focusAreas: [],
  avoidAreas: "",
  desiredFeelings: [],
  preferredDate: undefined,
  preferredTime: undefined,
  cancellationConsent: false,
};
