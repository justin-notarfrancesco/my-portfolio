/**
 * Scraper-resistant email encoding.
 *
 * The address never appears in the shipped HTML or JS. Pages render an opaque
 * token (XOR'd char codes, hex-encoded, reversed) and the client decodes it only
 * in response to a trusted user gesture — see `src/scripts/email-reveal.ts`.
 * Harvesters that read raw HTML or JSON-LD see neither a `mailto:` nor an `@`.
 *
 * This is obfuscation, not encryption: it stops automated harvesting, not a
 * determined human reading the source.
 */

const KEY = 0x5a;

export function encodeEmail(address: string): string {
  return Array.from(address, (ch) => (ch.charCodeAt(0) ^ KEY).toString(16).padStart(2, '0'))
    .join('')
    .split('')
    .reverse()
    .join('');
}

export function decodeEmail(token: string): string {
  const hex = token.split('').reverse().join('');
  let out = '';
  for (let i = 0; i < hex.length; i += 2) {
    out += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ KEY);
  }
  return out;
}
