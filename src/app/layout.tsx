import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Providers } from "@/components/ChakraProvider";

import type { Metadata } from "next";

// @ts-ignore
import "../css/main.css";
// @ts-ignore
import "../css/reset.css";

export const metadata: Metadata = {
  title: "Joe Burton - Portfolio",
  description:
    "Joe Burton is a Software Engineer specialised in creating beautifully crafted websites.",
  icons: {
    icon: "/assets/profile-images/me-masked.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="container">
            <div className="main">
              <Navigation />
              {children}
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
