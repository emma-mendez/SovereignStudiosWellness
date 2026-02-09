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
  ageGroup: z.enum(["18-25", "26-35", "36-45", "46-55", "56-88"]),
  weightCategory: z.enum(["under-70kg", "70-90kg", "90kg+"]),
  bodyType: z.enum(["petite", "average", "athletic", "curvy", "broad"]).optional(),

  // Session Preferences
  consentStyle: z.enum(["verbal-check-ins", "minimal-talking"]),
  soundPreference: z.enum(["silence", "meditation-sounds", "ambient-music"]),

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
  previousBodywork: undefined,
  underMedicalCare: undefined,
  medicalConditions: [],
  additionalNotes: "",
  primaryReason: undefined,
  understandsProfessional: undefined,
  roomTemperature: undefined,
  scentPreference: undefined,
  pressurePreference: undefined,
  focusAreas: [],
  avoidAreas: "",
  desiredFeelings: [],
  gender: undefined,
  ageGroup: undefined,
  weightCategory: undefined,
  bodyType: undefined,
  consentStyle: undefined,
  soundPreference: undefined,
  sessionDuration: undefined,
  cancellationConsent: false,
};

/**
 * Validates a single field from the consultation form against the Zod schema.
 * Returns true if validation passes, false otherwise.
 */
export const validateField = (
  field: string,
  value: unknown,
  required: boolean
): { valid: boolean; error?: string } => {
  // Non-required fields always pass
  if (!required) return { valid: true };

  // Check the schema shape for the field
  const shape = consultationFormSchema.shape;
  const fieldSchema = shape[field as keyof typeof shape];

  if (!fieldSchema) {
    // Unknown field - pass through
    return { valid: true };
  }

  const result = fieldSchema.safeParse(value);
  if (result.success) {
    return { valid: true };
  }

  return {
    valid: false,
    error: result.error.errors[0]?.message || "Invalid value",
  };
};

/**
 * Checks if a field value is considered "filled" for progression purposes.
 * This is separate from Zod validation - it checks if the user has provided any input.
 */
export const isFieldFilled = (
  fieldType: string,
  value: unknown,
  required: boolean
): boolean => {
  if (!required) return true;

  switch (fieldType) {
    case "checkbox":
      return Array.isArray(value) && value.length > 0;
    case "date":
      if (value && typeof value === "object" && "date" in value) {
        const dateVal = value as { date?: Date; time?: string };
        return dateVal.date instanceof Date && !!dateVal.time;
      }
      return false;
    case "radio":
    case "duration":
    case "text":
    case "email":
    case "phone":
    case "textarea":
      return !!value && value !== "";
    default:
      return !!value && value !== "";
  }
};
