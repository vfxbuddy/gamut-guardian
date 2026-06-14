import type { Rarity } from "./data";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function rarityClass(rarity: Rarity): string {
  const classes: Record<Rarity, string> = {
    Common: "border-stone-300/18 from-stone-500/12 to-black/10",
    Uncommon: "border-emerald-300/42 from-emerald-400/16 to-cyan-950/20",
    Rare: "border-cyan-200/50 from-cyan-300/18 to-indigo-900/24",
    Epic: "border-violet-200/60 from-violet-400/25 via-fuchsia-700/18 to-black/18",
    Legendary: "border-amber-200/80 from-amber-300/26 via-red-500/18 to-emerald-400/16",
  };

  return classes[rarity];
}
