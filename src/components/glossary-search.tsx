"use client";

import { useMemo, useState } from "react";
import type { GlossaryTerm } from "@/lib/data";
import { scoreSearch, searchTokens } from "@/lib/search";
import { CardFrame } from "./card-frame";

type GlossarySearchProps = {
  terms: GlossaryTerm[];
};

export function GlossarySearch({ terms }: GlossarySearchProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const tokens = searchTokens(query);
    if (!tokens.length) return terms;
    return terms
      .map((term) => {
        const haystack = [
          term.term,
          term.definition,
          term.productionUse,
          ...term.mistakes,
          ...term.aliases,
          ...term.questions,
          ...term.tags,
        ]
          .join(" ")
          .toLowerCase();
        const score = scoreSearch(haystack, query);
        return { term, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.term.term.localeCompare(b.term.term))
      .map((item) => item.term);
  }, [query, terms]);

  return (
    <section className="grid gap-5">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search ACES, IDT, EXR, viewer..."
        className="w-full rounded-[1.2rem] border border-cyan-200/25 bg-black/32 px-4 py-4 text-lg font-bold outline-none ring-cyan-200/30 transition focus:ring-4"
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((term) => (
          <CardFrame key={term.id} rarity={term.rarity} label={term.rarity}>
            <h2 className="text-2xl font-black">{term.term}</h2>
            <p className="mt-3 leading-7 text-white/68">{term.definition}</p>
            <p className="mt-3 rounded-2xl border border-cyan-100/10 bg-cyan-100/10 p-3 text-sm leading-6 text-cyan-50/75">
              {term.productionUse}
            </p>
            {term.mistakes.length ? (
              <div className="mt-3">
                <p className="pixel text-[0.58rem] text-amber-100/70">Watch For</p>
                <ul className="mt-2 grid gap-1 text-sm leading-6 text-white/58">
                  {term.mistakes.map((mistake) => (
                    <li key={mistake}>{mistake}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {[...term.tags, ...term.aliases.slice(0, 4)].map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/66">
                  {tag}
                </span>
              ))}
            </div>
          </CardFrame>
        ))}
      </div>
    </section>
  );
}
