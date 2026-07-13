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
          email: "hello@bloodnexusstudio.in", // Verified Brevo sender domain email
        },
        to: [
          {
            email: "hello@bloodnexusstudio.in",
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
