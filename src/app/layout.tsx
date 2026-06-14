import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TerminalShell } from "@/components/terminal-shell";

export const metadata: Metadata = {
  title: "Gamut Guardian",
  description: "A gamified ACES learning terminal for Nuke compositors.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TerminalShell>{children}</TerminalShell>
      </body>
    </html>
  );
}
