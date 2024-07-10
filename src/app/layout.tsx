import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Providers } from "@/components/ChakraProvider";

import type { Metadata } from "next";

import "../css/main.css";
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
    <html lang='en'>
      <body>
        <div className='container'>
          <div className='main'>
            <Navigation />
            <Providers>{children}</Providers>
          </div>
          <div className='footer'>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
