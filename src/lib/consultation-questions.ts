export interface QuestionStep {
  id: string;
  title: string;
  subtitle?: string;
  type: "text" | "email" | "phone" | "radio" | "checkbox" | "textarea" | "date" | "duration";
  field: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export const consultationQuestions: QuestionStep[] = [
  // Basic Info
  {
    id: "name",
    title: "What is your full name?",
    type: "text",
    field: "name",
    required: true,
    placeholder: "Enter your full name",
  },
  {
    id: "email",
    title: "What is your email address?",
    type: "email",
    field: "email",
    required: true,
    placeholder: "Enter your email",
  },
  {
    id: "phone",
    title: "What is your phone number?",
    type: "phone",
    field: "phone",
    required: true,
    placeholder: "Enter your phone number",
  },

  // Medical History
  {
    id: "previousBodywork",
    title: "Have you received bodywork, massage, or somatic therapy before?",
    type: "radio",
    field: "previousBodywork",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "underMedicalCare",
    title: "Are you currently under medical care?",
    type: "radio",
    field: "underMedicalCare",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "medicalConditions",
    title: "Do you have any of the following?",
    subtitle: "Select all that apply",
    type: "checkbox",
    field: "medicalConditions",
    options: [
      { value: "recent-surgery", label: "Recent surgery (last 6 months)" },
      { value: "blood-clots", label: "Blood clots / DVT" },
      { value: "heart-conditions", label: "Heart conditions" },
      { value: "cancer", label: "Cancer (current or recent)" },
      { value: "pregnancy", label: "Pregnancy" },
      { value: "epilepsy", label: "Epilepsy" },
      { value: "diabetes", label: "Diabetes" },
      { value: "skin-infections", label: "Skin infections / open wounds" },
      { value: "chronic-pain", label: "Chronic pain conditions" },
      { value: "none", label: "None of the above" },
    ],
  },
  {
    id: "additionalNotes",
    title: "Please share anything you feel is important for your practitioner to know",
    type: "textarea",
    field: "additionalNotes",
    placeholder: "Any additional information...",
  },

  // Booking Reason
  {
    id: "primaryReason",
    title: "What is your primary reason for booking?",
    type: "radio",
    field: "primaryReason",
    required: true,
    options: [
      { value: "stress-relief", label: "Stress relief / nervous system regulation" },
      { value: "muscle-tension", label: "Muscle tension / knots" },
      { value: "deep-tissue", label: "Deep tissue work" },
      { value: "recovery", label: "Recovery / maintenance" },
      { value: "first-time", label: "Curiosity / first time experience" },
    ],
  },

  // Consent
  {
    id: "understandsProfessional",
    title: "This session is non-sexual and strictly professional. Do you understand and agree?",
    type: "radio",
    field: "understandsProfessional",
    required: true,
    options: [
      { value: "yes", label: "Yes, I understand and agree" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "comfortableStudioEnvironment",
    title: "Are you comfortable receiving treatment in a wellness studio environment rather than a clinical setting?",
    type: "radio",
    field: "comfortableStudioEnvironment",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },

  // Preferences
  {
    id: "roomTemperature",
    title: "Preferred room temperature",
    type: "radio",
    field: "roomTemperature",
    required: true,
    options: [
      { value: "cool", label: "Cool" },
      { value: "warm", label: "Warm" },
      { value: "hot", label: "Hot" },
    ],
  },
  {
    id: "scentPreference",
    title: "Scent preference (optional)",
    type: "radio",
    field: "scentPreference",
    options: [
      { value: "none", label: "None" },
      { value: "lemongrass", label: "Lemongrass" },
      { value: "lavender", label: "Lavender" },
    ],
  },
  {
    id: "pressurePreference",
    title: "Preferred pressure",
    type: "radio",
    field: "pressurePreference",
    required: true,
    options: [
      { value: "light", label: "Light touch" },
      { value: "medium", label: "Medium" },
      { value: "deep", label: "Deep tissue" },
    ],
  },
  {
    id: "focusAreas",
    title: "Areas you want focused attention on",
    subtitle: "Select all that apply",
    type: "checkbox",
    field: "focusAreas",
    options: [
      { value: "neck", label: "Neck" },
      { value: "shoulders", label: "Shoulders" },
      { value: "back", label: "Back" },
      { value: "hips", label: "Hips" },
      { value: "legs", label: "Legs" },
      { value: "full-body", label: "Full body" },
    ],
  },
  {
    id: "avoidAreas",
    title: "Areas you do not want worked on",
    subtitle: "Important for trust and boundaries",
    type: "textarea",
    field: "avoidAreas",
    placeholder: "Please list any areas to avoid...",
  },

  // Intent
  {
    id: "desiredFeelings",
    title: "What are you hoping to feel after your session?",
    subtitle: "Select all that apply",
    type: "checkbox",
    field: "desiredFeelings",
    options: [
      { value: "calmer", label: "Calmer" },
      { value: "looser", label: "Looser" },
      { value: "lighter", label: "Lighter" },
      { value: "grounded", label: "Grounded" },
      { value: "pain-relief", label: "Pain relief" },
    ],
  },

  // Demographics
  {
    id: "gender",
    title: "Gender",
    type: "radio",
    field: "gender",
    required: true,
    options: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "prefer-not-to-say", label: "Prefer not to say" },
    ],
  },
  {
    id: "ageGroup",
    title: "Age group",
    type: "radio",
    field: "ageGroup",
    required: true,
    options: [
      { value: "18-25", label: "18–25" },
      { value: "26-35", label: "26–35" },
      { value: "36-45", label: "36–45" },
      { value: "46-55", label: "46–55" },
      { value: "55+", label: "55+" },
    ],
  },
  {
    id: "weightCategory",
    title: "Weight category",
    subtitle: "Used only to prepare the correct table setup and pressure approach",
    type: "radio",
    field: "weightCategory",
    required: true,
    options: [
      { value: "under-70kg", label: "Under 70kg" },
      { value: "70-90kg", label: "70–90kg" },
      { value: "90kg+", label: "90kg+" },
    ],
  },
  {
    id: "bodyType",
    title: "Body type (optional)",
    type: "radio",
    field: "bodyType",
    options: [
      { value: "petite", label: "Petite" },
      { value: "average", label: "Average" },
      { value: "athletic", label: "Athletic" },
      { value: "curvy", label: "Curvy" },
      { value: "broad", label: "Broad frame" },
    ],
  },

  // Session Preferences
  {
    id: "consentStyle",
    title: "Do you prefer verbal check-ins during the session or minimal talking?",
    type: "radio",
    field: "consentStyle",
    required: true,
    options: [
      { value: "verbal-check-ins", label: "Verbal check-ins" },
      { value: "minimal-talking", label: "Minimal talking" },
    ],
  },
  {
    id: "soundPreference",
    title: "Sound preference",
    type: "radio",
    field: "soundPreference",
    required: true,
    options: [
      { value: "silence", label: "Silence" },
      { value: "ambient-music", label: "Ambient music" },
      { value: "nature-sounds", label: "Nature sounds" },
    ],
  },
  {
    id: "wantsAftercareAdvice",
    title: "Would you like post-session aftercare advice?",
    type: "radio",
    field: "wantsAftercareAdvice",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },

  // Session Duration (before date selection)
  {
    id: "sessionDuration",
    title: "How long would you like your session?",
    subtitle: "Select your preferred duration",
    type: "duration",
    field: "sessionDuration",
    required: true,
    options: [
      { value: "30", label: "30 minutes" },
      { value: "60", label: "60 minutes" },
      { value: "90", label: "90 minutes" },
      { value: "120", label: "2 hours" },
    ],
  },

  // Date and Time (last question)
  {
    id: "preferredDate",
    title: "Select your preferred appointment date & time",
    subtitle: "Choose from available slots",
    type: "date",
    field: "preferredDate",
    required: true,
  },
];
