import sendgrid from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

const SENDGRID_API_KEY = process.env.NEXT_PUBLIC_SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not defined");
}

sendgrid.setApiKey(SENDGRID_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phoneNumber, message } = await req.json();

    await sendgrid.send({
      to: "joeburton@gmail.com", // email address that will receive message
      from: "joeburton@gmail.com", // @sendgrid/mail registered email
      subject: `Enquiry from ${email}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nMessage: ${message}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone Number: ${phoneNumber}</p><p>Message: ${message}</p>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}
