const stopWords = new Set(["a", "an", "and", "are", "do", "does", "for", "how", "i", "is", "it", "my", "of", "the", "to", "what", "when", "where", "why"]);

const queryAliases: Record<string, string[]> = {
  acct: ["acescct", "acescc", "aces cct", "grading space", "log ap1"],
  "aces-cct": ["acescct", "acescc", "grading space"],
  acescct: ["acct", "aces cct", "acescc", "grading space"],
  acescc: ["acescct", "acct", "grading space"],
  lin: ["linear", "scene linear"],
  lut: ["viewer lut", "view transform", "display transform", "output transform"],
  ocio: ["opencolorio", "ocio config"],
  rec709: ["rec.709", "rec 709", "display transform", "odt"],
  srgb: ["sRGB", "utility linear srgb", "linear srgb"],
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9.]+/g, " ").trim();
}

export function searchTokens(query: string): string[] {
  const baseTokens = normalize(query)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !stopWords.has(token));

  return Array.from(
    new Set(
      baseTokens.flatMap((token) => [
        token,
        token.replace(/\./g, ""),
        ...(queryAliases[token] ?? []),
      ]),
    ),
  );
}

export function scoreSearch(haystackValue: string, query: string): number {
  const haystack = normalize(haystackValue);
  const compactHaystack = haystack.replace(/\s+/g, "");
  const compactQuery = normalize(query).replace(/\s+/g, "");
  const tokens = searchTokens(query);

  if (!tokens.length) return 1;

  let score = compactQuery && compactHaystack.includes(compactQuery) ? 4 : 0;

  for (const token of tokens) {
    const normalizedToken = normalize(token);
    const compactToken = normalizedToken.replace(/\s+/g, "");

    if (haystack.includes(normalizedToken)) score += 2;
    else if (compactToken && compactHaystack.includes(compactToken)) score += 2;
  }

  return score;
}
