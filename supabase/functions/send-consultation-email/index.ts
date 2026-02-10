import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ConsultationData = z.object({
  company: z.string().max(0).optional(), // honeypot

  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{7,15}$/),

  isModelSession: z.boolean().optional(),

  previousBodywork: z.enum(["yes", "no"]),
  underMedicalCare: z.enum(["yes", "no"]),
  medicalConditions: z.array(z.string()),
  additionalNotes: z.string().optional(),

  primaryReason: z.string(),

  understandsProfessional: z.literal("yes"),

  roomTemperature: z.enum(["cool", "warm", "hot"]),
  scentPreference: z.enum(["none", "lemongrass", "lavender"]).optional(),
  pressurePreference: z.enum(["light", "medium", "deep"]),
  focusAreas: z.array(z.string()),
  avoidAreas: z.string().optional(),

  desiredFeelings: z.array(z.string()),

  gender: z.enum(["female", "male", "prefer-not-to-say"]),
  ageGroup: z.enum(["16-18","18-25", "26-35", "36-45", "46-55", "55-80"]),
  weightCategory: z.enum(["under-70kg", "70-90kg", "90kg+"]),
  bodyType: z.string().optional(),

  consentStyle: z.enum([
    "verbal-check-ins",
    "minimal-talking",
    "no-preference",
  ]),
  soundPreference: z.enum([
    "silence",
    "ambient-music",
    "meditation-music",
    "no-preference",
  ]),
  sessionDuration: z.enum(["30", "60", "90", "120"]),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const raw = await req.json();

    const parsed = ConsultationData.safeParse(raw);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten() }),
        { status: 400, headers: corsHeaders }
      );
    }

    const data = parsed.data;

    const emailHtml = `
      <h1>New Consultation Form Submission</h1>
      ${data.isModelSession ? "<p><strong>📸 MODEL SESSION</strong></p>" : ""}
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Age Group:</strong> ${data.ageGroup}</p>
      <p><strong>Gender:</strong> ${data.gender}</p>
      <p><strong>Weight:</strong> ${data.weightCategory}</p>
      <p><strong>Duration:</strong> ${data.sessionDuration} minutes</p>
    `;

    const result = await resend.emails.send({
      from: "Sovereign Wellness <onboarding@resend.dev>",
      to: ["sovereignwellnesslounge@gmail.com"],
      subject: `New Consultation: ${data.name}`,
      html: emailHtml,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
