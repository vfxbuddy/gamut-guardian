import type { OnboardingStep } from "@/lib/data";
import { cn, rarityClass } from "@/lib/utils";

type AcesOnboardingProps = {
  steps: OnboardingStep[];
};

function PixelPlate({ stepId }: { stepId: string }) {
  return (
    <div className={cn("pixel-sprite", `pixel-sprite-${stepId}`)} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export function AcesOnboarding({ steps }: AcesOnboardingProps) {
  return (
    <section className="grid gap-5">
      <div className="pixel-panel overflow-hidden p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <p className="pixel text-xs text-cyan-100/75">Onboarding Quest / ACES in Nuke</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-none sm:text-6xl">
              What ACES is, in three Nuke moves.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
              ACES is a color management system that keeps source images, compositing math, and display review from being mixed together. In Nuke, the practical mental model is simple: identify the input, work scene-linear, then view through the right display transform.
            </p>
          </div>

          <div className="pixel-frame bg-black/35 p-4">
            <p className="pixel text-[0.62rem] text-amber-100/80">Quick Answer</p>
            <p className="mt-3 text-sm leading-6 text-white/65">
              It is not a LUT you slap on top. It is a pipeline: source transform, working space, viewer/output transform.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.id} className={cn("pixel-frame card-tilt bg-gradient-to-br p-4", rarityClass(step.rarity))}>
              <div className="flex items-start justify-between gap-3">
                <span className="pixel rounded-lg border border-white/12 bg-black/35 px-3 py-2 text-xs text-cyan-100">0{index + 1}</span>
                <span className="pixel text-[0.62rem] text-white/45">{step.rarity}</span>
              </div>
              <div className="my-5 grid place-items-center">
                <PixelPlate stepId={step.id} />
              </div>
              <h2 className="text-2xl font-black leading-tight">{step.title}</h2>
              <p className="pixel mt-3 text-[0.62rem] text-amber-100/75">{step.nukeNode}</p>
              <p className="mt-3 text-sm leading-6 text-white/66">{step.purpose}</p>
              <div className="mt-4 rounded-xl border border-cyan-100/15 bg-cyan-100/10 p-3 text-sm leading-6 text-cyan-50/76">
                {step.compositorRead}
              </div>
              <p className="mt-4 text-sm leading-6 text-amber-100/68">{step.mistake}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span key={tag} className="rounded-lg border border-white/10 bg-black/24 px-2 py-1 text-xs font-bold text-white/64">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
        <div className="pixel-frame bg-black/24 p-4">
          <p className="pixel text-[0.62rem] text-cyan-100/70">Nuke Translation</p>
          <h2 className="mt-2 text-2xl font-black">Read</h2>
          <p className="mt-2 text-sm leading-6 text-white/62">The Read node is where the source gets interpreted. This is where log plates, EXRs, textures, and data passes need different decisions.</p>
        </div>
        <div className="pixel-frame bg-black/24 p-4">
          <p className="pixel text-[0.62rem] text-cyan-100/70">Nuke Translation</p>
          <h2 className="mt-2 text-2xl font-black">Project OCIO</h2>
          <p className="mt-2 text-sm leading-6 text-white/62">Project color management tells Nuke which ACES config, roles, working space, displays, and views are active.</p>
        </div>
        <div className="pixel-frame bg-black/24 p-4">
          <p className="pixel text-[0.62rem] text-cyan-100/70">Nuke Translation</p>
          <h2 className="mt-2 text-2xl font-black">Viewer</h2>
          <p className="mt-2 text-sm leading-6 text-white/62">The Viewer shows scene-linear values through a display transform. Keep that idea separate from the pixels you are compositing.</p>
        </div>
      </div>
    </section>
  );
}
