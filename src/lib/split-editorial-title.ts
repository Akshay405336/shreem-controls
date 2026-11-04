/** Split a phrase into charcoal lead + teal accent (last word). */
export function splitEditorialTitle(title: string): { lead: string; accent: string } {
  const trimmed = title.trim();
  const space = trimmed.lastIndexOf(" ");
  if (space <= 0) {
    return { lead: trimmed, accent: "" };
  }
  return {
    lead: trimmed.slice(0, space),
    accent: trimmed.slice(space + 1),
  };
}
