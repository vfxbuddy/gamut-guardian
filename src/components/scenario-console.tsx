"use client";

import { useState } from "react";
import type { Scenario } from "@/lib/data";
import { CardFrame } from "./card-frame";

type ScenarioConsoleProps = {
  scenarios: Scenario[];
};

export function ScenarioConsole({ scenarios }: ScenarioConsoleProps) {
  const [activeId, setActiveId] = useState(scenarios[0]?.id ?? "");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const scenario = scenarios.find((item) => item.id === activeId) ?? scenarios[0];
  const chosen = scenario.choices.find((choice) => choice.id === selectedChoice);

  return (
    <section className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div className="grid gap-3 self-start">
        {scenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveId(item.id);
              setSelectedChoice(null);
            }}
            className={`rounded-2xl border p-4 text-left transition ${
              item.id === activeId ? "border-cyan-200/60 bg-cyan-300/15" : "border-white/10 bg-white/[0.045]"
            }`}
          >
            <span className="pixel text-[0.62rem] text-cyan-100/70">{item.suit}</span>
            <strong className="mt-1 block">{item.title}</strong>
          </button>
        ))}
      </div>

      <CardFrame rarity="Epic" label={`Scenario / ${scenario.rewardXp} XP`}>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <h1 className="text-3xl font-black sm:text-5xl">{scenario.title}</h1>
            <p className="mt-4 text-lg leading-8 text-white/70">{scenario.prompt}</p>
            <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-black/28 p-4">
              <p className="pixel text-[0.62rem] text-amber-100/70">Plate State</p>
              <p className="mt-2 leading-7 text-white/70">{scenario.plateState}</p>
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-black/28 p-4">
            <div className="mb-3 h-28 rounded-2xl border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(70,244,255,.18),rgba(255,83,205,.14)),radial-gradient(circle_at_70%_30%,rgba(255,210,91,.26),transparent_34%)]" />
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-cyan-200/70" />
              <div className="h-2 w-3/4 rounded-full bg-fuchsia-300/60" />
              <div className="h-2 w-1/2 rounded-full bg-amber-200/60" />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {scenario.choices.map((choice) => {
            const wasChosen = selectedChoice === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => setSelectedChoice(choice.id)}
                className={`rounded-[1.15rem] border p-4 text-left font-black transition hover:-translate-y-1 ${
                  wasChosen && choice.isCorrect
                    ? "border-emerald-200/70 bg-emerald-300/15"
                    : wasChosen
                      ? "border-rose-200/70 bg-rose-300/15"
                      : "border-white/10 bg-white/[0.055]"
                }`}
              >
                {choice.label}
              </button>
            );
          })}
        </div>

        {chosen ? (
          <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-white/[0.055] p-4">
            <p className="pixel text-[0.62rem] text-cyan-100/70">{chosen.isCorrect ? "Pipeline Stabilized" : "Transform Warning"}</p>
            <p className="mt-2 leading-7 text-white/75">{chosen.feedback}</p>
          </div>
        ) : null}
      </CardFrame>
    </section>
  );
}
