import { describe, expect, it } from 'vitest';
import { decodeEmail, encodeEmail } from './email';
import { EMAIL_TOKEN } from './email-address';

describe('email obfuscation', () => {
  it('round-trips an address', () => {
    expect(decodeEmail(encodeEmail('ada@example.com'))).toBe('ada@example.com');
  });

  it('produces a token with no recognisable address parts', () => {
    expect(EMAIL_TOKEN).toMatch(/^[0-9a-f]+$/);
    expect(EMAIL_TOKEN).not.toContain('@');
    expect(decodeEmail(EMAIL_TOKEN)).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
  });
});
