import { AnswerFinder } from "@/components/answer-finder";
import { flashcards, glossaryTerms, guideArticles, knowledgeSources, scenarios, videoTutorials } from "@/lib/data";

export default function AnswerFinderPage() {
  return (
    <div className="grid gap-5">
      <header>
        <p className="pixel text-xs text-cyan-100/70">Reference / Search</p>
        <h1 className="mt-2 text-4xl font-black sm:text-6xl">Answer Finder</h1>
      </header>
      <AnswerFinder
        flashcards={flashcards}
        scenarios={scenarios}
        guides={guideArticles}
        terms={glossaryTerms}
        videos={videoTutorials}
        sources={knowledgeSources}
      />
    </div>
  );
}
