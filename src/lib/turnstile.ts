/**
 * Cloudflare Turnstile keys. Dev falls back to Cloudflare's published
 * always-pass test keys so the flow works locally without real ones; production
 * reads them from Vercel env settings (see `.env.example`).
 */
const TEST_SITE_KEY = '1x00000000000000000000AA';
const TEST_SECRET_KEY = '1x0000000000000000000000000000000AA';

export const TURNSTILE_SITE_KEY: string | undefined =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY?.trim() || (import.meta.env.DEV ? TEST_SITE_KEY : undefined);

export const TURNSTILE_SECRET_KEY: string | undefined =
  import.meta.env.TURNSTILE_SECRET_KEY?.trim() || (import.meta.env.DEV ? TEST_SECRET_KEY : undefined);

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(token: string, secret: string, ip?: string | null): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  const res = await fetch(SITEVERIFY_URL, { method: 'POST', body });
  if (!res.ok) {
    console.warn('turnstile siteverify http error', res.status);
    return false;
  }
  const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[]; hostname?: string };
  if (!data.success) {
    // Error codes only (e.g. invalid-input-secret, timeout-or-duplicate); no visitor data.
    console.warn('turnstile siteverify failed', data['error-codes'], data.hostname);
  }
  return data.success === true;
}
