import type { Rarity } from "./data";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function rarityClass(rarity: Rarity): string {
  const classes: Record<Rarity, string> = {
    Common: "border-white/15 from-slate-500/10 to-white/5",
    Uncommon: "border-cyan-300/35 from-cyan-400/15 to-blue-500/10",
    Rare: "border-blue-300/45 from-blue-400/20 to-violet-500/15",
    Epic: "border-violet-300/55 from-violet-400/25 to-fuchsia-500/20",
    Legendary: "border-amber-200/70 from-amber-300/25 via-cyan-300/15 to-fuchsia-400/25",
  };

  return classes[rarity];
}
