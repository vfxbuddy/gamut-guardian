import { GlossarySearch } from "@/components/glossary-search";
import { glossaryTerms } from "@/lib/data";

export default function GlossaryPage() {
  return (
    <div className="grid gap-5">
      <header>
        <p className="pixel text-xs text-cyan-100/70">Reference / Lexicon</p>
        <h1 className="mt-2 text-4xl font-black sm:text-6xl">Glossary</h1>
      </header>
      <GlossarySearch terms={glossaryTerms} />
    </div>
  );
}
