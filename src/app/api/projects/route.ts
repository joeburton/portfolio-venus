import { NextResponse } from "next/server";

// import { projects } from "./projects";

export async function GET() {
  return NextResponse.json(
    [
      {
        logo: "guardian.png",
        logoSize: "small",
        className: "guardian-logo",
        role: "Front-end Developer",
        company: "Guardian",
        description:
          "<p>I worked for the Guardian as a Front-end Developer creating HTML/ CSS cross browser/ platform compliant templates for www.thegreatplanthunt.org.</p>",
        skills: "JavaScript, jQuery, HTML, CSS3",
        links: [
          {
            visual: "www.theguardian.com",
            url: "https://www.theguardian.com/",
          },
          {
            visual: "www.greatplanthunt.org",
            url: "http://www.greatplanthunt.org",
          },
        ],
      },
    ],
    { status: 200 }
  );
}
