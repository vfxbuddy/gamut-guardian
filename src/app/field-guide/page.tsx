import { CardFrame } from "@/components/card-frame";
import { guideArticles } from "@/lib/data";

export default function FieldGuidePage() {
  return (
    <div className="grid gap-5">
      <header>
        <p className="pixel text-xs text-cyan-100/70">Reference / Production Notes</p>
        <h1 className="mt-2 text-4xl font-black sm:text-6xl">Field Guide</h1>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        {guideArticles.map((article) => (
          <CardFrame key={article.id} rarity="Rare" label={article.category}>
            <h2 className="text-2xl font-black">{article.title}</h2>
            <p className="mt-3 leading-7 text-white/68">{article.summary}</p>
            <ol className="mt-5 grid gap-3">
              {article.steps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                  <span className="pixel text-cyan-100">{index + 1}</span>
                  <span className="text-sm font-bold text-white/72">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap gap-2">
              {article.relatedTerms.map((term) => (
                <span key={term} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/62">
                  {term}
                </span>
              ))}
            </div>
          </CardFrame>
        ))}
      </section>
    </div>
  );
}
