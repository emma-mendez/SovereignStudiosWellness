import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConsultationData {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  serviceInterest: string[];
  sessionDuration: string;
  goals: string;
  healthConcerns: string;
  allergies: string;
  medications: string;
  previousExperience: string;
  pressurePreference: string;
  focusAreas: string[];
  additionalNotes: string;
  isModelSession?: boolean;
}

const formatArrayValue = (value: string[] | undefined): string => {
  if (!value || value.length === 0) return "Not specified";
  return value.join(", ");
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
            <td style="padding: 10px; border: 1px solid #ddd;">${data.fullName || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.email || 'Not provided'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Preferred Contact</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.preferredContact || 'Not specified'}</td>
          </tr>
        </table>

        <h2 style="color: #333; margin-top: 20px;">Service Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Services Interested In</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatArrayValue(data.serviceInterest)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Session Duration</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.sessionDuration || 'Not specified'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Goals</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.goals || 'Not provided'}</td>
          </tr>
        </table>

        <h2 style="color: #333; margin-top: 20px;">Health Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Health Concerns</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.healthConcerns || 'None'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Allergies</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.allergies || 'None'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Medications</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.medications || 'None'}</td>
          </tr>
        </table>

        <h2 style="color: #333; margin-top: 20px;">Preferences</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Previous Experience</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.previousExperience || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Pressure Preference</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.pressurePreference || 'Not specified'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Focus Areas</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatArrayValue(data.focusAreas)}</td>
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
      subject: `New Consultation: ${data.fullName || 'Unknown'}${data.isModelSession ? ' (Model Session)' : ''}`,
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
