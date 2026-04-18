import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Saudade Voces <info@saudadevoces.com>",
      to,
      subject,
      html,
    }),
  });
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Notify you
    await sendEmail(
      "hello@saudadevoces.com",
      `New message from ${name}`,
      `<h2>New Contact Form Submission</h2>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
       <p><strong>Message:</strong></p>
       <p>${message.replace(/\n/g, "<br>")}</p>`
    );

    // Auto-reply to visitor
    await sendEmail(
      email,
      "Thank you for reaching out — Saudade Voces",
      `<p>Dear ${name},</p>
       <p>Thank you for reaching out to us. We have received your message and will get back to you within 48 hours.</p>
       <p>In the meantime, feel free to explore our world at <a href="https://www.saudadevoces.com">saudadevoces.com</a>.</p>
       <br>
       <p>With love,</p>
       <p><strong>Saudade Voces</strong></p>`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
