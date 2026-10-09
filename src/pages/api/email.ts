import type { APIRoute } from 'astro';
import { EMAIL } from '../../lib/email-address';
import { TURNSTILE_SECRET_KEY, verifyTurnstile } from '../../lib/turnstile';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });

/** Returns the contact address only for a request carrying a valid Turnstile token. */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!TURNSTILE_SECRET_KEY) return json({ error: 'unavailable' }, 503);

  let token = '';
  try {
    token = String(((await request.json()) as { token?: unknown }).token ?? '');
  } catch {
    return json({ error: 'bad-request' }, 400);
  }
  if (!token) return json({ error: 'bad-request' }, 400);

  const ok = await verifyTurnstile(token, TURNSTILE_SECRET_KEY, clientAddress).catch(() => false);
  if (!ok) return json({ error: 'verification-failed' }, 403);

  return json({ email: EMAIL });
};
