import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Initialize Resend only when the API is called
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const { name, company, email, missions, budget, brief } = body;

    // Validate required fields
    if (!name || !email || !brief) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format missions array to string
    const missionsList = missions?.length > 0 ? missions.join(", ") : "Not specified";

    // Send email using Resend
    const toEmail = process.env.CONTACT_EMAIL;
    
    if (!toEmail) {
      console.error("CONTACT_EMAIL is not configured");
      return NextResponse.json(
        { error: "Contact email not configured" },
        { status: 500 }
      );
    }

    console.log("Sending email to:", toEmail);
    
    const { data, error } = await resend.emails.send({
      from: "BLACKBOX <project@blckbox.studio>",
      to: toEmail,
      replyTo: email,
      subject: `🚀 New Project Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">
                  🚀 New Project Inquiry
                </h1>
                <p style="color: #71717a; margin-top: 8px;">
                  Someone wants to work with BLACKBOX
                </p>
              </div>

              <!-- Main Card -->
              <div style="background-color: #18181b; border-radius: 16px; padding: 32px; border: 1px solid #27272a;">
                <!-- Client Info -->
                <div style="margin-bottom: 24px;">
                  <h2 style="color: #06b6d4; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">
                    Client Information
                  </h2>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="color: #71717a; padding: 8px 0; width: 120px;">Name</td>
                      <td style="color: #ffffff; padding: 8px 0; font-weight: 500;">${name}</td>
                    </tr>
                    <tr>
                      <td style="color: #71717a; padding: 8px 0;">Company</td>
                      <td style="color: #ffffff; padding: 8px 0; font-weight: 500;">${company || "Not specified"}</td>
                    </tr>
                    <tr>
                      <td style="color: #71717a; padding: 8px 0;">Email</td>
                      <td style="color: #06b6d4; padding: 8px 0;">
                        <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Divider -->
                <div style="height: 1px; background-color: #27272a; margin: 24px 0;"></div>

                <!-- Project Details -->
                <div style="margin-bottom: 24px;">
                  <h2 style="color: #a855f7; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">
                    Project Details
                  </h2>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="color: #71717a; padding: 8px 0; width: 120px;">Services</td>
                      <td style="color: #ffffff; padding: 8px 0;">${missionsList}</td>
                    </tr>
                    <tr>
                      <td style="color: #71717a; padding: 8px 0;">Budget</td>
                      <td style="color: #22c55e; padding: 8px 0; font-weight: 600;">${budget || "Not specified"}</td>
                    </tr>
                  </table>
                </div>

                <!-- Divider -->
                <div style="height: 1px; background-color: #27272a; margin: 24px 0;"></div>

                <!-- Brief -->
                <div>
                  <h2 style="color: #ec4899; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">
                    Project Brief
                  </h2>
                  <div style="background-color: #09090b; border-radius: 12px; padding: 20px; border: 1px solid #27272a;">
                    <p style="color: #d4d4d8; margin: 0; line-height: 1.6; white-space: pre-wrap;">${brief}</p>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; margin-top: 32px;">
                <p style="color: #52525b; font-size: 12px; margin: 0;">
                  This email was sent from blckbox.studio contact form
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data?.id);
    
    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

