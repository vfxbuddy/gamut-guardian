import { FlashcardDeck } from "@/components/flashcard-deck";
import { flashcards } from "@/lib/data";

export default function FlashcardsPage() {
  return (
    <div className="grid gap-5">
      <header>
        <p className="pixel text-xs text-cyan-100/70">Learn / Knowledge Cards</p>
        <h1 className="mt-2 text-4xl font-black sm:text-6xl">Flashcards</h1>
      </header>
      <FlashcardDeck cards={flashcards} />
    </div>
  );
}
