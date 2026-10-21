/**
 * Pull named `## Heading` sections out of a project's markdown body, verbatim,
 * so the homepage spreads can quote "What I built" and "Outcome" without
 * rendering the whole write-up. Inline `code` is kept; everything else is
 * escaped to plain text.
 */

/** Raw markdown under `## <heading>`, up to the next `## `. Empty if absent. */
export function section(body: string | undefined, heading: string): string {
  if (!body) return '';
  const m = body.match(new RegExp(`^## ${heading}\\s*$`, 'm'));
  if (!m || m.index === undefined) return '';
  const rest = body.slice(m.index + m[0].length);
  const end = rest.search(/^## /m);
  return (end === -1 ? rest : rest.slice(0, end)).trim();
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Typographer's quotes and dashes, as the markdown renderer sets the write-up
 * body, so frontmatter and quoted sections match it: ' → ’, "x" → “x”, -- → –.
 */
export function smart(text: string): string {
  return text
    .replace(/(^|[\s([{\u2014-])"/g, '$1\u201c')
    .replace(/"/g, '\u201d')
    .replace(/(^|[\s([{\u2014-])'/g, '$1\u2018')
    .replace(/'/g, '\u2019')
    .replace(/---/g, '\u2014')
    .replace(/--/g, '\u2013');
}

/** Escaped HTML with soft-wrapped lines joined and `code` spans preserved. */
export function inline(md: string): string {
  // Odd-indexed parts are code spans: kept verbatim, never smartened.
  return md
    .replace(/\s*\n\s*/g, ' ')
    .trim()
    .split(/`([^`]+)`/)
    .map((part, i) => (i % 2 ? `<code>${escapeHtml(part)}</code>` : escapeHtml(smart(part))))
    .join('');
}

/** A `- ` bullet list as an array of inline HTML strings. */
export function bullets(md: string): string[] {
  return md
    .split(/\n(?=- )/)
    .map((b) => inline(b.replace(/^- /, '')))
    .filter(Boolean);
}

/** "https://www.example.com/x" → "example.com". */
export function host(url?: string): string | undefined {
  return url ? new URL(url).hostname.replace(/^www\./, '') : undefined;
}
