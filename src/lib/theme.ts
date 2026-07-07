/**
 * NYC subway line palette + helpers.
 *
 * Authentic MTA line colors. Use `resolveColor()` to accept either a semantic
 * key ("red", "blue", …) or a raw hex string in content frontmatter.
 */

export const MTA = {
  blue: '#0039A6', // A C E
  orange: '#FF6319', // B D F M
  green: '#6CBE45', // G
  brown: '#996633', // J Z
  grey: '#A7A9AC', // L
  yellow: '#FCCC0A', // N Q R W
  red: '#EE352E', // 1 2 3
  darkgreen: '#00933C', // 4 5 6
  purple: '#B933AD', // 7
} as const;

export type LineKey = keyof typeof MTA;

/** Accepts a semantic key ("red") or a raw color ("#abc") and returns a hex/CSS color. */
export function resolveColor(input: string = 'blue'): string {
  return (MTA as Record<string, string>)[input] ?? input;
}
