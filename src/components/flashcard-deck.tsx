"use client";

import { useState } from "react";
import type { Flashcard } from "@/lib/data";
import { cn, rarityClass } from "@/lib/utils";

type FlashcardDeckProps = {
  cards: Flashcard[];
};

export function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const activeCard = cards[activeIndex];

  function move(delta: number) {
    setActiveIndex((index) => (index + delta + cards.length) % cards.length);
    setFlipped(false);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        className={cn(
          "group min-h-[28rem] rounded-[1.8rem] border bg-gradient-to-br p-5 text-left shadow-2xl shadow-black/40 transition hover:-translate-y-1",
          rarityClass(activeCard.rarity),
        )}
        aria-pressed={flipped}
      >
        <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-black/24 p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="pixel text-xs text-cyan-100/70">{activeCard.rarity}</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/70">
              {activeCard.difficulty}
            </span>
          </div>
          <div className="py-8">
            <p className="pixel mb-4 text-xs text-amber-100/70">{flipped ? "Answer" : "Prompt"}</p>
            <h2 className="text-3xl font-black leading-tight sm:text-5xl">
              {flipped ? activeCard.back : activeCard.front}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeCard.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-cyan-100/20 bg-cyan-100/10 px-3 py-1 text-xs font-bold text-cyan-50/80">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>

      <aside className="grid gap-3 self-start">
        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4">
          <p className="pixel text-xs text-cyan-100/70">Card</p>
          <p className="mt-1 text-2xl font-black">
            {activeIndex + 1}/{cards.length}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-black" type="button" onClick={() => move(-1)}>
            Prev
          </button>
          <button className="rounded-2xl border border-cyan-200/30 bg-cyan-300/15 px-4 py-3 font-black" type="button" onClick={() => move(1)}>
            Next
          </button>
        </div>
      </aside>
    </section>
  );
}
