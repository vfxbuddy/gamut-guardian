"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "City Gate", code: "GATE", district: "00" },
  { href: "/onboarding", label: "ACES 101", code: "BOOT", district: "01" },
  { href: "/flashcards", label: "Card Market", code: "CARDS", district: "02" },
  { href: "/challenges", label: "Duel Yard", code: "DUEL", district: "03" },
  { href: "/tutorials", label: "Signal Theatre", code: "VIDS", district: "04" },
  { href: "/field-guide", label: "Field Archive", code: "FIELD", district: "05" },
  { href: "/glossary", label: "Lexicon Alley", code: "LEX", district: "06" },
  { href: "/answer-finder", label: "Finder Relay", code: "SEEK", district: "07" },
];

type TerminalShellProps = {
  children: ReactNode;
};

export function TerminalShell({ children }: TerminalShellProps) {
  const pathname = usePathname();

  return (
    <div className="city-shell">
      <div className="city-grain" aria-hidden="true" />
      <div className="city-scan" aria-hidden="true" />
      <div className="city-skyline" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="city-layout">
        <aside className="district-nav">
          <Link href="/" className="city-brand" aria-label="Gamut Guardian city gate">
            <span className="brand-sigil" />
            <span>
              <span className="brand-title">Gamut Guardian</span>
              <span className="brand-subtitle">Color Science City</span>
            </span>
          </Link>

          <div className="operator-card">
            <p className="pixel">Operator</p>
            <strong>Junior Comp</strong>
            <span>ACES clearance active</span>
          </div>

          <nav className="district-list" aria-label="Training sectors">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={cn("district-link", active && "district-link-active")}>
                  <span className="district-number">{item.district}</span>
                  <span>
                    <span className="pixel district-code">{item.code}</span>
                    <span className="district-label">{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="city-stage">{children}</main>
      </div>
    </div>
  );
}
