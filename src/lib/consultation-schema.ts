import { z } from "zod";

/**
 * Shared schema: frontend + backend
 */
export const consultationSchema = z.object({
  // Honeypot (must be empty)
  company: z.string().max(0).optional(),

  // Basic Info
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .trim(),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(/^[0-9]{7,15}$/, "Phone number must contain digits only"),

  isModelSession: z.boolean().optional(),

  // Medical History
  previousBodywork: z.enum(["yes", "no"]),
  underMedicalCare: z.enum(["yes", "no"]),
  medicalConditions: z.array(z.string()),
  additionalNotes: z.string().optional(),

  // Booking Reason
  primaryReason: z.string().min(1),

  // Consent
  understandsProfessional: z.literal("yes"),

  // Preferences
  roomTemperature: z.enum(["cool", "warm", "hot"]),
  scentPreference: z.enum(["none", "lemongrass", "lavender"]).optional(),
  pressurePreference: z.enum(["light", "medium", "deep"]),
  focusAreas: z.array(z.string()),
  avoidAreas: z.string().optional(),

  // Intent
  desiredFeelings: z.array(z.string()),

  // Demographics
  gender: z.enum(["female", "male", "prefer-not-to-say"]),
  ageGroup: z.enum(["18-25", "26-35", "36-45", "46-55", "55_plus"]),
  weightCategory: z.enum(["under-70kg", "70-90kg", "90kg+"]),
  bodyType: z.string().optional(),

  // Session Preferences
  consentStyle: z.enum([
    "verbal-check-ins",
    "minimal-talking",
    "no-preference",
  ]),
  soundPreference: z.enum([
    "silence",
    "ambient-music",
    "nature-sounds",
    "meditation-sounds",
    "no-preference",
  ]),
  sessionDuration: z.enum(["30", "60", "90", "120"]),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

export const defaultFormValues: Partial<ConsultationFormData> = {
  medicalConditions: [],
  focusAreas: [],
  desiredFeelings: [],
};
