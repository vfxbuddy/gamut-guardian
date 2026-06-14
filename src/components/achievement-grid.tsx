import { achievements, totalStarterXp } from "@/lib/data";
import { CardFrame } from "./card-frame";

export function AchievementGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {achievements.map((achievement) => {
        const unlocked = totalStarterXp >= achievement.xpRequired;
        return (
          <CardFrame
            key={achievement.id}
            rarity={achievement.rarity}
            label={unlocked ? "Unlocked" : "Locked"}
            className={unlocked ? "animate-[card-pop_360ms_ease-out]" : "grayscale opacity-35"}
          >
            <div className="flex items-start gap-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10">
                <span className="pixel text-lg">{achievement.rarity.slice(0, 1)}</span>
              </div>
              <div>
                <h3 className="font-black">{achievement.title}</h3>
                <p className="mt-1 text-sm leading-6 text-white/62">{achievement.description}</p>
              </div>
            </div>
          </CardFrame>
        );
      })}
    </div>
  );
}
