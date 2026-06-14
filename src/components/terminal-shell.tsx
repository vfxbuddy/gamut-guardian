"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", code: "HOME" },
  { href: "/onboarding", label: "ACES 101", code: "BOOT" },
  { href: "/flashcards", label: "Flashcards", code: "LEARN" },
  { href: "/challenges", label: "Challenges", code: "DUEL" },
  { href: "/tutorials", label: "Tutorials", code: "VIDS" },
  { href: "/field-guide", label: "Field Guide", code: "FIELD" },
  { href: "/glossary", label: "Glossary", code: "LEX" },
  { href: "/answer-finder", label: "Answer Finder", code: "SEEK" },
];

type TerminalShellProps = {
  children: ReactNode;
};

export function TerminalShell({ children }: TerminalShellProps) {
  const pathname = usePathname();

  return (
    <div className="terminal-grid min-h-screen overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-30 -mx-4 border-b border-amber-200/12 bg-[#080506]/90 px-4 pb-3 pt-2 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group flex items-center gap-3" aria-label="Gamut Guardian dashboard">
              <span className="grid size-11 place-items-center rounded-xl border border-amber-300/45 bg-amber-300/10 shadow-[0_0_28px_rgba(255,90,47,0.18)]">
                <span className="size-6 rounded-sm bg-gradient-to-br from-amber-200 via-red-500 to-emerald-300 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
              </span>
              <span>
                <span className="block text-lg font-black uppercase leading-none">Gamut Guardian</span>
                <span className="pixel text-[0.62rem] text-amber-200/78">ACES Training Terminal</span>
              </span>
            </Link>

            <div className="hidden rounded-full border border-amber-200/30 bg-amber-200/10 px-4 py-2 text-right sm:block">
              <p className="pixel text-[0.62rem] text-amber-100/80">Rank</p>
              <p className="text-sm font-black text-amber-100">Junior Comp</p>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Primary sections">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-2xl border px-3 py-2 text-left transition hover:-translate-y-0.5",
                    active
                      ? "border-amber-200/70 bg-amber-300/15 shadow-[0_0_22px_rgba(255,90,47,0.2)]"
                      : "border-white/10 bg-white/[0.045] hover:border-amber-100/25",
                  )}
                >
                  <span className="pixel block text-[0.58rem] text-amber-100/72">{item.code}</span>
                  <span className="block whitespace-nowrap text-sm font-bold">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="flex-1 py-5 sm:py-7">{children}</main>
      </div>
    </div>
  );
}
