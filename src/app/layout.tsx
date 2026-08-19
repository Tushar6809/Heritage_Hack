import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heritage | Discover India's Hidden Heritage",
  description: "Discover India's hidden heritage — through the eyes of the people who live there.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
