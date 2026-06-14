import { FlashcardDeck } from "@/components/flashcard-deck";
import { flashcardPacks, flashcards } from "@/lib/data";

export default function FlashcardsPage() {
  return (
    <div className="grid gap-5">
      <header className="pixel-panel p-5">
        <p className="pixel text-xs text-amber-100/75">Collection / Training Table</p>
        <h1 className="mt-2 text-4xl font-black leading-none sm:text-6xl">Booster Decks</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/62">
          Choose a pack, inspect the active card, flip it for the answer, and move through the set like a tactical card table instead of a static quiz list.
        </p>
      </header>
      <FlashcardDeck cards={flashcards} packs={flashcardPacks} />
    </div>
  );
}
