import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Prompting Guide | Ask It Right",
  description:
    "Master prompting for Claude, Gemini, Grok, ChatGPT, and DeepSeek. Learn which service yields the best results for your use case, with CLI power-user tutorials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
