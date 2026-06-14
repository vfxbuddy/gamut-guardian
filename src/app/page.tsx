import Link from "next/link";
import { AchievementGrid } from "@/components/achievement-grid";
import { CardFrame } from "@/components/card-frame";
import { ProgressRing } from "@/components/progress-ring";
import { flashcardPacks, glossaryTerms, onboardingSteps, scenarios, topics, totalStarterXp, videoTutorials } from "@/lib/data";

const rank = "Junior Comp";
const nextRank = "Compositor";
const progress = Math.round((totalStarterXp / 220) * 100);

export default function DashboardPage() {
  const dailyScenario = scenarios[0];

  return (
    <div className="grid gap-5">
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <CardFrame rarity="Legendary" label="Home Dashboard" className="min-h-[24rem]">
          <div className="grid h-full gap-6 md:grid-cols-[minmax(0,1fr)_12rem]">
            <div className="flex flex-col justify-between">
              <div>
                <p className="pixel text-cyan-100/75">Training Terminal Online</p>
                <h1 className="mt-3 max-w-3xl text-5xl font-black leading-[0.92] sm:text-7xl">
                  Learn ACES like a collectible card game.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                  Start with the ACES 101 quest, collect production flashcard packs, then test yourself with scenario duels built for Nuke compositors.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="rounded-xl border border-amber-200/45 bg-amber-300/15 px-5 py-3 font-black shadow-[0_0_28px_rgba(255,200,87,0.12)]" href="/onboarding">
                  Start ACES 101
                </Link>
                <Link className="rounded-2xl border border-cyan-200/45 bg-cyan-300/15 px-5 py-3 font-black shadow-[0_0_28px_rgba(50,230,255,0.12)]" href="/challenges">
                  Daily Duel
                </Link>
                <Link className="rounded-2xl border border-white/12 bg-white/10 px-5 py-3 font-black" href="/answer-finder">
                  Find Answer
                </Link>
              </div>
            </div>
            <ProgressRing value={progress} label="Mastery" />
          </div>
        </CardFrame>

        <CardFrame rarity="Epic" label="Rank">
          <p className="pixel text-5xl text-amber-100">{totalStarterXp}</p>
          <p className="mt-1 text-sm font-bold text-white/55">XP earned</p>
          <div className="my-5 h-px bg-white/10" />
          <p className="text-2xl font-black">{rank}</p>
          <p className="mt-2 text-sm leading-6 text-white/62">Next clearance: {nextRank}</p>
        </CardFrame>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        <CardFrame rarity="Legendary" label="Onboarding">
          <p className="pixel text-4xl text-amber-100">{onboardingSteps.length}</p>
          <p className="mt-2 font-black">ACES 101 Steps</p>
          <p className="mt-2 text-sm leading-6 text-white/58">Input, working space, and display explained as a Nuke-first onboarding quest.</p>
        </CardFrame>
        <CardFrame rarity="Rare" label="Knowledge Vault">
          <p className="pixel text-4xl text-cyan-100">{glossaryTerms.length}</p>
          <p className="mt-2 font-black">Glossary Cards</p>
          <p className="mt-2 text-sm leading-6 text-white/58">Terms now include aliases, common artist questions, production usage notes, and mistakes.</p>
        </CardFrame>
        <CardFrame rarity="Epic" label="Tutorial Theatre">
          <p className="pixel text-4xl text-amber-100">{videoTutorials.length}</p>
          <p className="mt-2 font-black">Playable Videos</p>
          <p className="mt-2 text-sm leading-6 text-white/58">Embedded ACES, OCIO, and Nuke tutorials plus links to broader YouTube searches.</p>
        </CardFrame>
        <CardFrame rarity="Uncommon" label="Card Packs">
          <p className="pixel text-4xl text-fuchsia-100">{flashcardPacks.length}</p>
          <p className="mt-2 font-black">Collectible Decks</p>
          <p className="mt-2 text-sm leading-6 text-white/58">Starter, source ops, shot rescue, and color pipeline packs are now selectable.</p>
        </CardFrame>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-3 md:grid-cols-2">
          {topics.map((topic) => (
            <CardFrame key={topic.id} rarity={topic.xp > 35 ? "Rare" : "Uncommon"} label={topic.suit}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">{topic.title}</h2>
                  <p className="mt-2 leading-7 text-white/65">{topic.summary}</p>
                </div>
                <span className="pixel rounded-full border border-white/10 bg-white/10 px-3 py-2 text-cyan-100">{topic.xp}</span>
              </div>
            </CardFrame>
          ))}
        </div>

        <CardFrame rarity="Rare" label="Daily Challenge">
          <h2 className="text-3xl font-black">{dailyScenario.title}</h2>
          <p className="mt-3 leading-7 text-white/68">{dailyScenario.prompt}</p>
          <Link className="mt-5 inline-flex rounded-2xl border border-cyan-200/40 bg-cyan-300/15 px-4 py-3 font-black" href="/challenges">
            Enter Duel
          </Link>
        </CardFrame>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-black">Achievement Shelf</h2>
          <span className="pixel text-xs text-white/45">Armor</span>
        </div>
        <AchievementGrid />
      </section>
    </div>
  );
}
