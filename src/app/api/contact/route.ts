import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, missionType, budget, briefing } = body;

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("Missing BREVO_API_KEY environment variable");
      return NextResponse.json(
        { error: "Email service not configured. Please add BREVO_API_KEY in .env" },
        { status: 500 }
      );
    }

    // Read the HTML email template from the workspace root
    const templatePath = path.join(process.cwd(), "MISSION_CONTROL_EMAIL_TEMPLATE.html");
    let html = "";
    try {
      html = await fs.promises.readFile(templatePath, "utf-8");
    } catch (err) {
      console.error("Failed to read email template, falling back to basic layout:", err);
      html = `
        <html>
        <body style="font-family: sans-serif; padding: 20px; background-color: #0b0b0d; color: #f2efe9;">
          <h2>Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Project Type:</strong> ${missionType || "N/A"}</p>
          <p><strong>Budget:</strong> ${budget || "N/A"}</p>
          <p><strong>Message / Briefing:</strong></p>
          <pre style="background: #141418; padding: 15px; border-radius: 4px;">${briefing}</pre>
        </body>
        </html>
      `;
    }

    // Inject Phone Number dynamically below the Email value in the grid
    const emailBlock = `<div class="label">Communication Channel</div>\n            <div class="value">{{ email }}</div>`;
    const phoneBlock = `<div class="label">Communication Channel</div>\n            <div class="value">${email}</div>\n            <div class="label" style="margin-top: 15px;">Secure Line / Phone No.</div>\n            <div class="value">${phone || "N/A"}</div>`;

    html = html
      .replace("{{ name }}", name || "N/A")
      .replace(emailBlock, phoneBlock)
      .replace("{{ mission_type }}", missionType || "GENERAL INQUIRY")
      .replace("{{ budget }}", budget || "N/A")
      .replace("{{ briefing }}", briefing || "N/A");

    const senderEmail = process.env.BREVO_SENDER_EMAIL || "bloodnexusstudio@gmail.com";
    const receiverEmail = process.env.BREVO_RECEIVER_EMAIL || "bloodnexusstudio@gmail.com";

    // Send via Brevo HTTP API
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "BloodNexus Web Inquiries",
          email: senderEmail,
        },
        to: [
          {
            email: receiverEmail,
            name: "BloodNexus Admin",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `Project Inquiry: ${name} (${missionType || "General"})`,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo API error response:", errorText);
      return NextResponse.json({ error: "Failed to transmit via Brevo" }, { status: response.status });
    }

    // Send auto-responder thank-you email directly to the user
    try {
      const currentYear = new Date().getFullYear();
      const autoResponderHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Thank You for Contacting BloodNexus</title>
        </head>
        <body style="font-family: sans-serif; background-color: #0b0b0d; color: #f2efe9; padding: 40px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #141418; border: 1px solid rgba(193, 18, 31, 0.25); border-radius: 8px; padding: 40px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #ffffff; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 900; margin: 0; font-size: 24px; border-bottom: 2px solid #c1121f; display: inline-block; padding-bottom: 10px;">BLOODNEXUS</h1>
            </div>
            <h2 style="color: #ffffff; font-size: 20px; font-weight: 700; margin-top: 0; text-transform: uppercase; letter-spacing: 0.05em;">Transmission Acknowledged</h2>
            <p style="font-size: 15px; line-height: 1.6; color: rgba(242, 239, 233, 0.8);">
              Hello <strong>${name}</strong>,
            </p>
            <p style="font-size: 15px; line-height: 1.6; color: rgba(242, 239, 233, 0.8);">
              Thank you for contacting BloodNexus Studio. We have successfully received your inquiry and project parameters.
            </p>
            <p style="font-size: 15px; line-height: 1.6; color: rgba(242, 239, 233, 0.8);">
              Our team is reviewing your briefing, and we will get back to you shortly.
            </p>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(242, 239, 233, 0.1); font-size: 12px; color: rgba(242, 239, 233, 0.5); text-align: center;">
              <p style="margin: 0;">© ${currentYear} BloodNexus Studio. All Rights Reserved.</p>
              <p style="margin: 5px 0 0 0;">Thane, India</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          sender: {
            name: "BloodNexus Studio",
            email: senderEmail,
          },
          to: [
            {
              email: email,
              name: name,
            },
          ],
          subject: `Thank you for contacting BloodNexus Studio`,
          htmlContent: autoResponderHtml,
        }),
      });
    } catch (err) {
      console.error("Failed to send auto-responder to user:", err);
      // Fail silently to avoid interrupting the main inquiry transmission flow
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in contact API route handler:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
