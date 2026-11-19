import { describe, expect, it } from 'vitest';
import { buildMailtoHref } from './contact';

const TO = 'justinnotar@gmail.com';

describe('buildMailtoHref', () => {
  it('gives direct email links a default subject and leaves the body blank', () => {
    const href = buildMailtoHref(TO);
    const url = new URL(href);

    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe(TO);
    expect(url.searchParams.get('subject')).toBe('New message via portfolio site');
    expect(url.searchParams.has('body')).toBe(false);
    expect(href).toContain('subject=New%20message%20via%20portfolio%20site');
  });

  it('produces a valid mailto: URL with subject and body query params', () => {
    const href = buildMailtoHref(TO, {
      name: 'Ada Lovelace',
      message: 'Hello there',
    });

    const url = new URL(href);
    expect(url.protocol).toBe('mailto:');
    // The address is the URL "pathname" for a mailto: URL.
    expect(url.pathname).toBe(TO);

    const params = url.searchParams;
    expect(params.get('subject')).toBe('New message from Ada Lovelace via portfolio site');
    expect(params.get('body')).toBe('Hello there');
  });

  it('percent-encodes spaces as %20, not "+"', () => {
    const href = buildMailtoHref(TO, {
      name: 'Grace Hopper',
      message: 'two words',
    });

    // A literal "+" in a mailto body is rendered literally by some clients.
    expect(href).not.toContain('+');
    expect(href).toContain('%20');
  });

  it('percent-encodes newlines in the message as %0A', () => {
    const href = buildMailtoHref(TO, {
      name: 'Alan',
      message: 'line one\nline two',
    });

    expect(href).toContain('line%20one%0Aline%20two');
  });

  it('encodes characters that would otherwise break the URL', () => {
    const href = buildMailtoHref(TO, {
      name: 'A & B',
      message: 'Rate is 50% off? Yes! #deal =win',
    });

    // These characters must not survive raw into the query string.
    expect(href).not.toMatch(/[&#].*message/i);

    const url = new URL(href);
    expect(url.searchParams.get('subject')).toBe('New message from A & B via portfolio site');
    expect(url.searchParams.get('body')).toBe('Rate is 50% off? Yes! #deal =win');
  });

  it('trims surrounding whitespace from all fields', () => {
    const href = buildMailtoHref(TO, {
      name: '  Ada  ',
      message: '  hi  ',
    });

    const url = new URL(href);
    expect(url.searchParams.get('subject')).toBe('New message from Ada via portfolio site');
    expect(url.searchParams.get('body')).toBe('hi');
  });

  it('never emits the "post"/enctype form pattern that Safari rejects', () => {
    // Regression guard for the original bug: the href must be a query-string
    // mailto, not a bare "mailto:address" relying on form POST semantics.
    const href = buildMailtoHref(TO, {
      name: 'x',
      message: 'y',
    });
    expect(href.startsWith(`mailto:${TO}?`)).toBe(true);
  });
});
