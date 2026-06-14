import { TutorialTheatre } from "@/components/tutorial-theatre";
import { videoTutorials, youtubeSearches } from "@/lib/data";

export default function TutorialsPage() {
  return (
    <div className="grid gap-5">
      <header>
        <p className="pixel text-xs text-cyan-100/70">Learn / Video Theatre</p>
        <h1 className="mt-2 text-4xl font-black sm:text-6xl">Tutorials</h1>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-white/62">
          Curated ACES, OCIO, and Nuke videos that can be watched in-app. Use the search links to jump into broader YouTube results when you want more.
        </p>
      </header>
      <TutorialTheatre videos={videoTutorials} searches={youtubeSearches} />
    </div>
  );
}
