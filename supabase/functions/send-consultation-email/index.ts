import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);

const ConsultationData = z.object({
  company: z.string().max(0).optional(),
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^07\d{9}$/, {
    message: "Phone number must start with 07 and contain 11 digits",
  }),
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
  ageGroup: z.enum(["16-18", "18-25", "26-35", "36-45", "46-55", "55-80"]),
  weightCategory: z.enum(["under-70kg", "70-90kg", "90kg+"]),
  bodyType: z.string().optional(),
  consentStyle: z.enum([
    "verbal-check-ins",
    "no-talking",
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
  const origin = req.headers.get("origin") ?? "";

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const raw = await req.json();
    console.log("Incoming consultation payload received");

    const parsed = ConsultationData.safeParse(raw);

    if (!parsed.success) {
      console.error("Validation failed", parsed.error.flatten());
      console.error("Raw payload received", JSON.stringify(raw, null, 2));

      return new Response(
        JSON.stringify({
          message: "Validation failed",
          details: parsed.error.format(),
          received: raw,
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const data = parsed.data;

    if (data.company && data.company.trim() !== "") {
      console.log("Honeypot triggered");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    const emailHtml = `
    <h1>New Consultation Form Submission</h1>

    ${data.isModelSession ? "<p><strong>📸 MODEL SESSION</strong></p>" : ""}

    <h2>Client Details</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Age Group:</strong> ${data.ageGroup}</p>
    <p><strong>Gender:</strong> ${data.gender}</p>
    <p><strong>Weight:</strong> ${data.weightCategory}</p>

    <h2>Session Info</h2>
    <p><strong>Primary Reason:</strong> ${data.primaryReason}</p>
    <p><strong>Duration:</strong> ${data.sessionDuration} minutes</p>
    <p><strong>Pressure:</strong> ${data.pressurePreference}</p>
    <p><strong>Room Temperature:</strong> ${data.roomTemperature}</p>
    <p><strong>Scent:</strong> ${data.scentPreference ?? "None"}</p>

    <h2>Focus</h2>
    <p><strong>Focus Areas:</strong> ${data.focusAreas.join(", ")}</p>
    <p><strong>Avoid Areas:</strong> ${data.avoidAreas ?? "None"}</p>

    <h2>Wellness</h2>
    <p><strong>Desired Feelings:</strong> ${data.desiredFeelings.join(", ")}</p>
    <p><strong>Previous Bodywork:</strong> ${data.previousBodywork}</p>
    <p><strong>Under Medical Care:</strong> ${data.underMedicalCare}</p>
    <p><strong>Medical Conditions:</strong> ${
      data.medicalConditions.length ? data.medicalConditions.join(", ") : "None"
    }</p>

    <h2>Preferences</h2>
    <p><strong>Consent Style:</strong> ${data.consentStyle}</p>
    <p><strong>Sound Preference:</strong> ${data.soundPreference}</p>

    ${
      data.additionalNotes
        ? `<h2>Additional Notes</h2><p>${data.additionalNotes}</p>`
        : ""
    }
  `;
    const result = await resend.emails.send({
      from: "Sovereign Wellness <onboarding@resend.dev>",
      to: ["sovereignwellnesslounge@gmail.com"],
      subject: `New Consultation: ${data.name}`,
      html: emailHtml,
    });

    console.log("Resend response:", JSON.stringify(result));

    if (result.error) {
      console.error("Resend send failed:", result.error);
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Function crash:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: corsHeaders }
    );
  }
});