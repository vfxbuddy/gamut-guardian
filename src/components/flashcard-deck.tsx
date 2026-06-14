"use client";

import { useMemo, useState } from "react";
import type { Flashcard, FlashcardPack, Rarity } from "@/lib/data";
import { cn, rarityClass } from "@/lib/utils";

type FlashcardDeckProps = {
  cards: Flashcard[];
  packs: FlashcardPack[];
};

const rarityPower: Record<Rarity, number> = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  Epic: 4,
  Legendary: 5,
};

function suitClass(suit: FlashcardPack["suit"] | undefined): string {
  return `suit-${(suit ?? "Primaries").toLowerCase()}`;
}

export function FlashcardDeck({ cards, packs }: FlashcardDeckProps) {
  const [activePackId, setActivePackId] = useState(packs[0]?.id ?? "all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const activePack = packs.find((pack) => pack.id === activePackId);
  const visibleCards = useMemo(
    () => (activePack ? activePack.cardIds.map((id) => cards.find((card) => card.id === id)).filter((card): card is Flashcard => Boolean(card)) : cards),
    [activePack, cards],
  );
  const activeCard = visibleCards[activeIndex] ?? cards[0];
  const activeSuitClass = suitClass(activePack?.suit);
  const fanCards = visibleCards.slice(0, 5);

  function choosePack(packId: string) {
    setActivePackId(packId);
    setActiveIndex(0);
    setFlipped(false);
  }

  function chooseCard(index: number) {
    setActiveIndex(index);
    setFlipped(false);
  }

  function move(delta: number) {
    setActiveIndex((index) => (index + delta + visibleCards.length) % visibleCards.length);
    setFlipped(false);
  }

  return (
    <section className="card-game-table">
      <div className="booster-rail" aria-label="Flashcard packs">
        {packs.map((pack) => {
          const active = pack.id === activePackId;

          return (
            <button
              key={pack.id}
              type="button"
              onClick={() => choosePack(pack.id)}
              className={cn("booster-pack", suitClass(pack.suit), rarityClass(pack.rarity), active && "booster-pack-active")}
            >
              <span className="booster-seal">{pack.cardIds.length}</span>
              <span className="pixel booster-kicker">{pack.subtitle}</span>
              <span className="booster-title">{pack.title}</span>
              <span className="booster-desc">{pack.description}</span>
              <span className="pixel booster-suit">{pack.suit} suit</span>
            </button>
          );
        })}
      </div>

      <section className="playmat">
        <div className="table-glow" aria-hidden="true" />

        <div className="fan-stack" aria-hidden="true">
          {fanCards.map((card, index) => (
            <div key={card.id} className={cn("fan-card", `fan-card-${index}`, rarityClass(card.rarity))}>
              <span className="fan-gem" />
              <span className="fan-line" />
              <span className="fan-line fan-line-short" />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className={cn("tcg-card", activeSuitClass, rarityClass(activeCard.rarity), flipped && "tcg-card-flipped")}
          aria-pressed={flipped}
        >
          <span className="tcg-cost">{rarityPower[activeCard.rarity]}</span>
          <div className="tcg-frame">
            <div className="tcg-top">
              <span className="pixel">{activeCard.rarity}</span>
              <span>{activeCard.difficulty}</span>
            </div>

            <div className="tcg-portrait" aria-hidden="true">
              <div className="pixel-guardian">
                {Array.from({ length: 25 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>

            <div className="tcg-title-block">
              <p className="pixel">{activePack?.suit ?? "Knowledge"} card</p>
              <h2>{activeCard.front}</h2>
            </div>

            <div className="tcg-rules">
              <p className="pixel">{flipped ? "Decoded Answer" : "Challenge Prompt"}</p>
              <strong>{flipped ? activeCard.back : "Tap the card to reveal the production answer."}</strong>
            </div>

            <div className="tcg-tags">
              {activeCard.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </button>

        <aside className="command-panel">
          <div>
            <p className="pixel text-[0.62rem] text-amber-100/75">Active Booster</p>
            <h3>{activePack?.title ?? "All Cards"}</h3>
            <p>{activePack?.description}</p>
          </div>

          <div className="card-slots">
            {visibleCards.map((card, index) => (
              <button key={card.id} type="button" onClick={() => chooseCard(index)} className={cn("card-slot", index === activeIndex && "card-slot-active")}>
                <span className="slot-rarity">{rarityPower[card.rarity]}</span>
                <span>{card.front}</span>
              </button>
            ))}
          </div>

          <div className="table-controls">
            <button type="button" onClick={() => move(-1)}>
              Prev
            </button>
            <span className="pixel">
              {activeIndex + 1}/{visibleCards.length}
            </span>
            <button type="button" onClick={() => move(1)}>
              Next
            </button>
          </div>
        </aside>
      </section>
    </section>
  );
}
