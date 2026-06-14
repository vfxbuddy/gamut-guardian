"use client";

import { useMemo, useState } from "react";
import type { VideoTutorial } from "@/lib/data";
import { CardFrame } from "./card-frame";

type TutorialTheatreProps = {
  videos: VideoTutorial[];
  searches: { label: string; href: string }[];
};

function embedUrl(video: VideoTutorial): string {
  if (video.playlistId) return `https://www.youtube.com/embed/videoseries?list=${video.playlistId}`;
  return `https://www.youtube.com/embed/${video.youtubeId ?? ""}`;
}

export function TutorialTheatre({ videos, searches }: TutorialTheatreProps) {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const activeVideo = videos.find((video) => video.id === activeId) ?? videos[0];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return videos;
    return videos.filter((video) =>
      [video.title, video.channel, video.summary, video.level, ...video.tags].join(" ").toLowerCase().includes(needle),
    );
  }, [query, videos]);

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <CardFrame rarity="Legendary" label="Tutorial Theatre">
        <div className="aspect-video overflow-hidden rounded-[1.25rem] border border-white/10 bg-black">
          <iframe
            className="h-full w-full"
            src={embedUrl(activeVideo)}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="mt-4">
          <p className="pixel text-[0.62rem] text-cyan-100/70">{activeVideo.channel}</p>
          <h2 className="mt-1 text-3xl font-black">{activeVideo.title}</h2>
          <p className="mt-3 leading-7 text-white/68">{activeVideo.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeVideo.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/66">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardFrame>

      <aside className="grid gap-4 self-start">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter videos: ACEScg, OCIO, Resolve..."
          className="w-full rounded-[1.2rem] border border-cyan-200/25 bg-black/32 px-4 py-3 font-bold outline-none ring-cyan-200/30 transition focus:ring-4"
        />

        <div className="grid max-h-[34rem] gap-3 overflow-y-auto pr-1">
          {filtered.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActiveId(video.id)}
              className={`rounded-[1.1rem] border p-4 text-left transition hover:-translate-y-0.5 ${
                video.id === activeId ? "border-cyan-200/60 bg-cyan-300/15" : "border-white/10 bg-white/[0.045]"
              }`}
            >
              <span className="pixel text-[0.58rem] text-cyan-100/70">{video.level}</span>
              <strong className="mt-1 block leading-tight">{video.title}</strong>
              <span className="mt-2 block text-xs font-bold text-white/48">{video.channel}</span>
            </button>
          ))}
        </div>

        <div className="rounded-[1.25rem] border border-amber-200/20 bg-amber-200/10 p-4">
          <p className="pixel text-[0.62rem] text-amber-100/70">Open YouTube Search</p>
          <div className="mt-3 grid gap-2">
            {searches.map((search) => (
              <a key={search.href} href={search.href} className="rounded-2xl border border-white/10 bg-black/22 px-3 py-2 text-sm font-black text-white/72">
                {search.label}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
