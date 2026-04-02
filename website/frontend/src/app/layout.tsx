import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Prompting Guide | Ask It Right",
  description:
    "Master prompting for Claude, Gemini, Grok, ChatGPT, and DeepSeek. Learn which service yields the best results for your use case, with CLI power-user tutorials.",
  alternates: {
    canonical: "https://askairight.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://askairight.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
