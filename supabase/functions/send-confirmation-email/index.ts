import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConsultationData {
  // Basic Info
  name: string;
  email: string;
  phone: string;
  isModelSession?: boolean;
  
  // Medical History
  previousBodywork: "yes" | "no";
  underMedicalCare: "yes" | "no";
  medicalConditions: string[];
  additionalNotes?: string;
  
  // Booking Reason
  primaryReason: string;
  
  // Consent
  understandsProfessional: "yes" | "no";
  comfortableStudioEnvironment: "yes" | "no";
  
  // Preferences
  roomTemperature: "cool" | "warm" | "hot";
  scentPreference: "none" | "lemongrass" | "lavender";
  pressurePreference: "light" | "medium" | "deep";
  focusAreas: string[];
  avoidAreas?: string;
  
  // Intent
  desiredFeelings: string[];
  
  // Demographics
  gender: "female" | "male" | "prefer-not-to-say";
  ageGroup: string;
  weightCategory: string;
  bodyType?: string;
  
  // Session Preferences
  consentStyle: "verbal-check-ins" | "minimal-talking";
  soundPreference: "silence" | "ambient-music" | "nature-sounds";
  wantsAftercareAdvice: "yes" | "no";
  
  // Session Duration and Booking
  // sessionDuration: string;
  // preferredDate?: string;
  // preferredTime?: string;
}

const formatArrayValue = (value: string[] | undefined): string => {
  if (!value || value.length === 0) return "None specified";
  return value.join(", ");
};

const formatYesNo = (value: string | undefined): string => {
  if (!value) return "Not specified";
  return value === "yes" ? "Yes" : "No";
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ConsultationData = await req.json();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #8B5A2B; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
          New Consultation Form Submission
        </h1>
        
        ${data.isModelSession ? '<p style="background: #FFF3CD; padding: 10px; border-radius: 5px;"><strong>📸 This is a MODEL SESSION request</strong></p>' : ''}
        
        <h2 style="color: #333; margin-top: 20px;">Contact Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.name || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email || 'Not provided'}</a></td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td>
          </tr>
        </table>

        <h2 style="color: #333; margin-top: 20px;">Demographics</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Gender</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.gender || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Age Group</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.ageGroup || 'Not specified'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Weight Category</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.weightCategory || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Body Type</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.bodyType || 'Not specified'}</td>
          </tr>
        </table>

        <h2 style="color: #333; margin-top: 20px;">Session Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Primary Reason for Visit</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.primaryReason || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Session Duration</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.sessionDuration ? data.sessionDuration + ' minutes' : 'Not specified'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Desired Feelings</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatArrayValue(data.desiredFeelings)}</td>
          </tr>
        </table>

        <h2 style="color: #333; margin-top: 20px;">Medical History</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Previous Bodywork Experience</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatYesNo(data.previousBodywork)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Under Medical Care</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatYesNo(data.underMedicalCare)}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Medical Conditions</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatArrayValue(data.medicalConditions)}</td>
          </tr>
        </table>

        <h2 style="color: #333; margin-top: 20px;">Session Preferences</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Pressure Preference</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.pressurePreference || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Focus Areas</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatArrayValue(data.focusAreas)}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Areas to Avoid</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.avoidAreas || 'None'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Room Temperature</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.roomTemperature || 'Not specified'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Scent Preference</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.scentPreference || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Sound Preference</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.soundPreference || 'Not specified'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Communication Style</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.consentStyle === 'verbal-check-ins' ? 'Verbal Check-ins' : data.consentStyle === 'minimal-talking' ? 'Minimal Talking' : 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Wants Aftercare Advice</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatYesNo(data.wantsAftercareAdvice)}</td>
          </tr>
        </table>

        <h2 style="color: #333; margin-top: 20px;">Consent Confirmations</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Understands Professional Nature</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatYesNo(data.understandsProfessional)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Comfortable with Studio Environment</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatYesNo(data.comfortableStudioEnvironment)}</td>
          </tr>
        </table>

        ${data.additionalNotes ? `
        <h2 style="color: #333; margin-top: 20px;">Additional Notes</h2>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #D4AF37;">
          ${data.additionalNotes}
        </p>
        ` : ''}

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This consultation was submitted via Sovereign Wellness Lounge website.
        </p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Sovereign Wellness <onboarding@resend.dev>",
      to: ["sovereignwellnesslounge@gmail.com"],
      subject: `New Consultation: ${data.name || 'Unknown'}${data.isModelSession ? ' (Model Session)' : ''}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending consultation email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
