import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afridyn Engineering Limited | Engineering Excellence Across Africa",
  description:
    "Afridyn Engineering Limited provides world-class mechanical, electrical, IT, fibre optic, logistics, and engineering consultation services across Africa.",
  keywords:
    "engineering, Zambia, Africa, mechanical, electrical, IT equipment, fibre optic, logistics, ZPPA, PACRA",
  openGraph: {
    title: "Afridyn Engineering Limited",
    description: "Engineering Excellence Across Africa",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
