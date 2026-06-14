import Link from "next/link";
import { AchievementGrid } from "@/components/achievement-grid";
import { ProgressRing } from "@/components/progress-ring";
import { flashcardPacks, glossaryTerms, onboardingSteps, scenarios, totalStarterXp, videoTutorials } from "@/lib/data";

const progress = Math.round((totalStarterXp / 220) * 100);

const sectors = [
  {
    href: "/onboarding",
    code: "District 01",
    title: "ACES Orientation",
    meta: `${onboardingSteps.length} step boot sequence`,
    copy: "A cinematic onboarding route through input, scene-linear comp, and display transforms.",
  },
  {
    href: "/flashcards",
    code: "District 02",
    title: "Holographic Card Market",
    meta: `${flashcardPacks.length} booster decks`,
    copy: "Collectible training cards for source transforms, comp math, view transforms, and rescue workflows.",
  },
  {
    href: "/challenges",
    code: "District 03",
    title: "Trial Yard",
    meta: `${scenarios.length} live scenarios`,
    copy: "Play the right workflow card against broken shots, wrong Read nodes, and double-transform traps.",
  },
  {
    href: "/answer-finder",
    code: "District 07",
    title: "Finder Relay",
    meta: `${glossaryTerms.length}+ indexed terms`,
    copy: "Ask production-style ACES and Nuke questions without digging through a manual.",
  },
];

export default function DashboardPage() {
  const dailyScenario = scenarios[0];

  return (
    <div className="city-home">
      <section className="cinematic-hero">
        <div className="hero-depth" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-copy">
          <p className="pixel hero-kicker">ACES City / Night Shift</p>
          <h1>
            <span>Enter the</span>
            <span>color pipeline</span>
            <span>underground.</span>
          </h1>
          <p>
            Gamut Guardian is a retro-futuristic training simulator for Nuke compositors: collect workflow cards, decode ACES, and rescue broken shots across the city.
          </p>
          <div className="hero-actions">
            <Link href="/flashcards">Enter Card Market</Link>
            <Link href="/onboarding">Run ACES Boot</Link>
          </div>
        </div>
        <div className="hero-monitor">
          <p className="pixel">Current Signal</p>
          <h2>{dailyScenario.title}</h2>
          <span>{dailyScenario.prompt}</span>
        </div>
      </section>

      <section className="sector-grid" aria-label="Training districts">
        {sectors.map((sector) => (
          <Link key={sector.href} href={sector.href} className="sector-card">
            <span className="pixel sector-code">{sector.code}</span>
            <h2>{sector.title}</h2>
            <p>{sector.copy}</p>
            <strong>{sector.meta}</strong>
          </Link>
        ))}
      </section>

      <section className="city-status-grid">
        <div className="status-monitor">
          <p className="pixel">Mastery Uplink</p>
          <ProgressRing value={progress} label="Mastery" />
        </div>
        <div className="status-monitor status-monitor-wide">
          <p className="pixel">Signal Library</p>
          <div className="signal-stats">
            <span>
              <strong>{videoTutorials.length}</strong>
              Tutorials
            </span>
            <span>
              <strong>{glossaryTerms.length}</strong>
              Lexicon Cards
            </span>
            <span>
              <strong>{totalStarterXp}</strong>
              XP Online
            </span>
          </div>
        </div>
      </section>

      <section>
        <div className="shelf-heading">
          <h2>Armor Shelf</h2>
          <span className="pixel">unlock grid</span>
        </div>
        <AchievementGrid />
      </section>
    </div>
  );
}
