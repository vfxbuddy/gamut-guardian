# Gamut Guardian

Gamut Guardian is a gamified ACES learning and reference terminal for Nuke compositors.

It combines flashcards, scenario challenges, field-guide reference, glossary lookup, answer search, XP, ranks, and achievements into a card-centric training experience.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Local TypeScript content data

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
