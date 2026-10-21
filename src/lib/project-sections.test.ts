import { describe, expect, it } from 'vitest';
import { bullets, host, inline, section, smart } from './project-sections';

const body = `## Overview

Intro line.

## What I built

- First thing, with a \`bigint\`
  wrapped onto two lines.
- Second <thing>.

## Outcome

Done.
`;

describe('section', () => {
  it('returns the markdown under a heading up to the next one', () => {
    expect(section(body, 'Outcome')).toBe('Done.');
    expect(section(body, 'Overview')).toBe('Intro line.');
  });

  it('returns an empty string for a missing heading or body', () => {
    expect(section(body, 'Nope')).toBe('');
    expect(section(undefined, 'Outcome')).toBe('');
  });
});

describe('bullets', () => {
  it('joins wrapped lines, keeps code spans, and escapes HTML', () => {
    expect(bullets(section(body, 'What I built'))).toEqual([
      'First thing, with a <code>bigint</code> wrapped onto two lines.',
      'Second &lt;thing&gt;.',
    ]);
  });
});

describe('inline', () => {
  it('collapses newlines into spaces', () => {
    expect(inline('a\n  b')).toBe('a b');
  });
});

describe('smart', () => {
  it('curls quotes and apostrophes', () => {
    expect(smart(`An "Add your business" flow; you're in, it's 'ok'`)).toBe(
      'An \u201cAdd your business\u201d flow; you\u2019re in, it\u2019s \u2018ok\u2019',
    );
  });

  it('leaves code spans alone inside inline()', () => {
    expect(inline("it's `a'b`")).toBe('it\u2019s <code>a\'b</code>');
  });
});

describe('host', () => {
  it('strips the protocol, path, and www', () => {
    expect(host('https://www.vouchedsoftware.com/x')).toBe('vouchedsoftware.com');
    expect(host(undefined)).toBeUndefined();
  });
});
