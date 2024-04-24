import Welcome from "@/components/emails/WelcomeTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { firstName, from, to } = await request.json();

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject: "Welcome to Every Penny",
      react: Welcome({ firstName }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
