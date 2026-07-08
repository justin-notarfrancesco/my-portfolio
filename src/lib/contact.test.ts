import { describe, expect, it } from 'vitest';
import { buildMailtoHref } from './contact';

const TO = 'justin@notar.nyc';

describe('buildMailtoHref', () => {
  it('produces a valid mailto: URL with subject and body query params', () => {
    const href = buildMailtoHref(TO, {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello there',
    });

    const url = new URL(href);
    expect(url.protocol).toBe('mailto:');
    // The address is the URL "pathname" for a mailto: URL.
    expect(url.pathname).toBe(TO);

    const params = url.searchParams;
    expect(params.get('subject')).toBe('New message from Ada Lovelace via portfolio site');
    expect(params.get('body')).toBe(
      'Name: Ada Lovelace\nEmail: ada@example.com\n\nHello there',
    );
  });

  it('percent-encodes spaces as %20, not "+"', () => {
    const href = buildMailtoHref(TO, {
      name: 'Grace Hopper',
      email: 'grace@example.com',
      message: 'two words',
    });

    // A literal "+" in a mailto body is rendered literally by some clients.
    expect(href).not.toContain('+');
    expect(href).toContain('%20');
  });

  it('percent-encodes newlines in the message as %0A', () => {
    const href = buildMailtoHref(TO, {
      name: 'Alan',
      email: 'alan@example.com',
      message: 'line one\nline two',
    });

    expect(href).toContain('line%20one%0Aline%20two');
  });

  it('encodes characters that would otherwise break the URL', () => {
    const href = buildMailtoHref(TO, {
      name: 'A & B',
      email: 'ab@example.com',
      message: 'Rate is 50% off? Yes! #deal =win',
    });

    // These characters must not survive raw into the query string.
    expect(href).not.toMatch(/[&#].*message/i);

    const url = new URL(href);
    expect(url.searchParams.get('subject')).toBe('New message from A & B via portfolio site');
    expect(url.searchParams.get('body')).toBe(
      'Name: A & B\nEmail: ab@example.com\n\nRate is 50% off? Yes! #deal =win',
    );
  });

  it('trims surrounding whitespace from all fields', () => {
    const href = buildMailtoHref(TO, {
      name: '  Ada  ',
      email: '  ada@example.com  ',
      message: '  hi  ',
    });

    const url = new URL(href);
    expect(url.searchParams.get('subject')).toBe('New message from Ada via portfolio site');
    expect(url.searchParams.get('body')).toBe(
      'Name: Ada\nEmail: ada@example.com\n\nhi',
    );
  });

  it('never emits the "post"/enctype form pattern that Safari rejects', () => {
    // Regression guard for the original bug: the href must be a query-string
    // mailto, not a bare "mailto:address" relying on form POST semantics.
    const href = buildMailtoHref(TO, {
      name: 'x',
      email: 'x@example.com',
      message: 'y',
    });
    expect(href.startsWith(`mailto:${TO}?`)).toBe(true);
  });
});
