"use client";

import { useMemo, useState } from "react";
import type { GlossaryTerm } from "@/lib/data";
import { CardFrame } from "./card-frame";

type GlossarySearchProps = {
  terms: GlossaryTerm[];
};

export function GlossarySearch({ terms }: GlossarySearchProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return terms;
    return terms.filter((term) =>
      [term.term, term.definition, ...term.tags].join(" ").toLowerCase().includes(needle),
    );
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
            <div className="mt-4 flex flex-wrap gap-2">
              {term.tags.map((tag) => (
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
