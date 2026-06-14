"use client";

import { useMemo, useState } from "react";
import type { Flashcard, GlossaryTerm, GuideArticle, Scenario } from "@/lib/data";

type AnswerFinderProps = {
  flashcards: Flashcard[];
  scenarios: Scenario[];
  guides: GuideArticle[];
  terms: GlossaryTerm[];
};

export function AnswerFinder({ flashcards, scenarios, guides, terms }: AnswerFinderProps) {
  const [query, setQuery] = useState("viewer transform");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const items = [
      ...flashcards.map((item) => ({ kind: "Flashcard", title: item.front, body: item.back, href: "/flashcards" })),
      ...scenarios.map((item) => ({ kind: "Scenario", title: item.title, body: item.prompt, href: "/challenges" })),
      ...guides.map((item) => ({ kind: "Guide", title: item.title, body: item.summary, href: "/field-guide" })),
      ...terms.map((item) => ({ kind: "Glossary", title: item.term, body: item.definition, href: "/glossary" })),
    ];

    if (!needle) return items;
    return items.filter((item) => `${item.kind} ${item.title} ${item.body}`.toLowerCase().includes(needle));
  }, [flashcards, guides, query, scenarios, terms]);

  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-[1.2rem] border border-cyan-200/25 bg-black/32 px-4 py-4 text-lg font-bold outline-none ring-cyan-200/30 transition focus:ring-4"
          placeholder="Ask for a term, workflow, or mistake..."
        />
        <div className="mt-4 grid gap-3">
          {results.map((item) => (
            <a key={`${item.kind}-${item.title}`} href={item.href} className="rounded-[1.1rem] border border-white/10 bg-black/22 p-4 transition hover:border-cyan-200/40 hover:bg-cyan-200/10">
              <span className="pixel text-[0.62rem] text-cyan-100/70">{item.kind}</span>
              <h2 className="mt-1 font-black">{item.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/62">{item.body}</p>
            </a>
          ))}
        </div>
      </div>

      <aside className="self-start rounded-[1.5rem] border border-amber-200/20 bg-amber-200/10 p-4">
        <p className="pixel text-[0.62rem] text-amber-100/70">Hits</p>
        <strong className="mt-1 block text-5xl">{results.length}</strong>
        <p className="mt-3 text-sm leading-6 text-white/62">Local knowledge base across cards, scenarios, field notes, and glossary entries.</p>
      </aside>
    </section>
  );
}
