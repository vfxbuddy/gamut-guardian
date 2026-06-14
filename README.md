# Gamut Guardian

Gamut Guardian is a gamified ACES learning and reference terminal for Nuke compositors.

It combines flashcards, scenario challenges, tutorial videos, field-guide reference, glossary lookup, answer search, XP, ranks, and achievements into a card-centric training experience.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Local TypeScript content data

## Knowledge Base

The current vault is local TypeScript data in `src/lib/data.ts`. Entries include aliases, common artist questions, production usage notes, mistakes to watch for, source references, and curated YouTube tutorial metadata.

There is no backend or live YouTube API yet. The Tutorial Theatre embeds curated videos directly and provides YouTube search links for broader discovery.

## Local Development

```powershell
npm.cmd install
npm.cmd run dev
```

## Production Build

```powershell
npm.cmd run build
```

## Product Direction

The current source-of-truth docs live in `docs/`:

- `docs/project_brief.md`
- `docs/design.md`
- `docs/codex_prompt.md`

Vercel should use the Next.js framework preset and `npm run build`.
