import type { ReactNode } from "react";
import type { Rarity } from "@/lib/data";
import { cn, rarityClass } from "@/lib/utils";

type CardFrameProps = {
  children: ReactNode;
  className?: string;
  rarity?: Rarity;
  label?: string;
};

export function CardFrame({ children, className, rarity = "Common", label }: CardFrameProps) {
  return (
    <article
      className={cn(
        "pixel-frame card-tilt scanline relative overflow-hidden rounded-[0.95rem] border bg-gradient-to-br p-4 shadow-2xl shadow-black/30",
        rarityClass(rarity),
        className,
      )}
    >
      <div className="rainbow-line absolute inset-x-5 top-0 h-0.5 opacity-80" />
      {label ? <p className="pixel mb-3 text-[0.62rem] text-cyan-100/70">{label}</p> : null}
      {children}
    </article>
  );
}
