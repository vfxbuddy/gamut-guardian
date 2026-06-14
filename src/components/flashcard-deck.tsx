"use client";

import { useState } from "react";
import type { Flashcard, FlashcardPack } from "@/lib/data";
import { cn, rarityClass } from "@/lib/utils";

type FlashcardDeckProps = {
  cards: Flashcard[];
  packs: FlashcardPack[];
};

export function FlashcardDeck({ cards, packs }: FlashcardDeckProps) {
  const [activePackId, setActivePackId] = useState(packs[0]?.id ?? "all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const activePack = packs.find((pack) => pack.id === activePackId);
  const visibleCards = activePack ? activePack.cardIds.map((id) => cards.find((card) => card.id === id)).filter((card): card is Flashcard => Boolean(card)) : cards;
  const activeCard = visibleCards[activeIndex] ?? cards[0];

  function choosePack(packId: string) {
    setActivePackId(packId);
    setActiveIndex(0);
    setFlipped(false);
  }

  function move(delta: number) {
    setActiveIndex((index) => (index + delta + visibleCards.length) % visibleCards.length);
    setFlipped(false);
  }

  return (
    <section className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {packs.map((pack) => {
          const active = pack.id === activePackId;

          return (
            <button
              key={pack.id}
              type="button"
              onClick={() => choosePack(pack.id)}
              className={cn(
                "pixel-frame card-tilt min-h-48 bg-gradient-to-br p-4 text-left transition",
                rarityClass(pack.rarity),
                active && "shadow-[0_0_34px_rgba(50,230,255,0.22)]",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="pixel text-[0.62rem] text-cyan-100/70">{pack.subtitle}</span>
                <span className="rounded-lg border border-white/12 bg-black/35 px-2 py-1 text-xs font-black text-white/65">{pack.cardIds.length}</span>
              </div>
              <div className="my-5 h-16 pixel-pack-art" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <h2 className="text-2xl font-black leading-tight">{pack.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/62">{pack.description}</p>
              <p className="pixel mt-4 text-[0.62rem] text-amber-100/70">{pack.suit} suit</p>
            </button>
          );
        })}
      </div>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className={cn(
            "collectible-card group min-h-[31rem] bg-gradient-to-br p-3 text-left shadow-2xl shadow-black/45 transition hover:-translate-y-1",
            rarityClass(activeCard.rarity),
          )}
          aria-pressed={flipped}
        >
          <div className="card-sheen flex h-full flex-col justify-between rounded-[1.05rem] border border-white/12 bg-black/32 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="pixel rounded-lg border border-cyan-100/20 bg-cyan-100/10 px-3 py-2 text-xs text-cyan-100/80">{activeCard.rarity}</span>
              <span className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white/72">
                {activeCard.difficulty}
              </span>
            </div>

            <div className="my-5 grid min-h-36 place-items-center rounded-xl border border-white/10 bg-black/24">
              <div className="pixel-card-art" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="py-3">
              <p className="pixel mb-4 text-xs text-amber-100/70">{flipped ? "Answer" : "Prompt"}</p>
              <h2 className={cn("font-black leading-tight", flipped ? "text-2xl sm:text-4xl" : "text-3xl sm:text-5xl")}>
                {flipped ? activeCard.back : activeCard.front}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeCard.tags.map((tag) => (
                <span key={tag} className="rounded-lg border border-cyan-100/20 bg-cyan-100/10 px-3 py-1 text-xs font-bold text-cyan-50/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </button>

        <aside className="grid gap-3 self-start">
          <div className="pixel-frame bg-white/[0.045] p-4">
            <p className="pixel text-xs text-cyan-100/70">Active Pack</p>
            <p className="mt-1 text-2xl font-black">{activePack?.title ?? "All Cards"}</p>
            <p className="mt-3 text-sm leading-6 text-white/58">{activePack?.description}</p>
          </div>
          <div className="pixel-frame bg-white/[0.045] p-4">
            <p className="pixel text-xs text-cyan-100/70">Card</p>
            <p className="mt-1 text-2xl font-black">
              {activeIndex + 1}/{visibleCards.length}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 font-black" type="button" onClick={() => move(-1)}>
              Prev
            </button>
            <button className="rounded-xl border border-cyan-200/30 bg-cyan-300/15 px-4 py-3 font-black" type="button" onClick={() => move(1)}>
              Next
            </button>
          </div>
        </aside>
      </section>
    </section>
  );
}
