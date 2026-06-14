import { ScenarioConsole } from "@/components/scenario-console";
import { scenarios } from "@/lib/data";

export default function ChallengesPage() {
  return (
    <div className="grid gap-5">
      <header>
        <p className="pixel text-xs text-cyan-100/70">Practice / Scenario Challenges</p>
        <h1 className="mt-2 text-4xl font-black sm:text-6xl">Scenario Challenges</h1>
      </header>
      <ScenarioConsole scenarios={scenarios} />
    </div>
  );
}
