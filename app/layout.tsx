import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAIHARISH D",
  description:
    "Personal engineering portfolio of Jaiharish D — Computer Science student building software, AI systems, cloud platforms, and experimental digital products.",
  keywords: [
    "Jaiharish D",
    "Computer Science Engineer",
    "Creative Developer",
    "AI/ML",
    "Full-Stack Systems",
    "FastAPI",
    "React",
    "Chennai",
    "InovX REC",
    "Smart India Hackathon",
  ],
  authors: [{ name: "Jaiharish D" }],
  creator: "Jaiharish D",
  openGraph: {
    title: "JAIHARISH D",
    description: "Personal engineering portfolio of Jaiharish D.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png" },
      { url: "/apple-touch-icon.png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F2EB",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/icon.png?v=3" type="image/png" />
        <link rel="shortcut icon" href="/favicon/icon.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon/icon.png?v=3" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F5F2EB] text-[#1D1C1A] font-body antialiased">
        {children}
      </body>
    </html>
  );
}
