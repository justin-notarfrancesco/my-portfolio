/**
 * Turnstile-gated email reveal for the contact page.
 *
 * The address is not in the page at all. A trusted click on any
 * `a[data-email-reveal]` runs a Cloudflare Turnstile check, exchanges the token
 * at `/api/email` for the address, and swaps it into every reveal link. That
 * first click only reveals; the link becomes a real `mailto:` for the next one.
 */

declare global {
  interface Window {
    turnstile?: {
      render(el: HTMLElement, opts: Record<string, unknown>): string;
      remove(id: string): void;
    };
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let pending: Promise<string> | null = null;

function loadTurnstile(): Promise<NonNullable<Window['turnstile']>> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')));
    s.onerror = () => reject(new Error('turnstile'));
    document.head.append(s);
  });
}

async function fetchEmail(container: HTMLElement): Promise<string> {
  const siteKey = container.dataset.sitekey;
  if (!siteKey) throw new Error('unconfigured');

  const turnstile = await loadTurnstile();
  const token = await new Promise<string>((resolve, reject) => {
    const id = turnstile.render(container, {
      sitekey: siteKey,
      action: 'reveal-email',
      appearance: 'interaction-only',
      callback: (t: string) => {
        resolve(t);
        turnstile.remove(id);
      },
      'error-callback': () => reject(new Error('challenge')),
      'expired-callback': () => reject(new Error('expired')),
    });
  });

  const res = await fetch('/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) throw new Error('verify');
  const { email } = (await res.json()) as { email?: string };
  if (!email) throw new Error('verify');
  return email;
}

/** Resolve the address once per page view; failures reset so the user can retry. */
export function getEmail(): Promise<string> {
  const container = document.getElementById('email-challenge');
  const status = document.getElementById('email-status');
  if (!container) return Promise.reject(new Error('missing'));

  if (!pending) {
    if (status) status.textContent = 'Checking you’re human…';
    pending = fetchEmail(container).then(
      (email) => {
        if (status) status.textContent = '';
        reveal(email);
        return email;
      },
      (err) => {
        pending = null;
        if (status) status.textContent = "Couldn't verify you're human. Please try again, or reach out on LinkedIn.";
        throw err;
      },
    );
  }
  return pending;
}

function reveal(email: string) {
  document.querySelectorAll<HTMLAnchorElement>('a[data-email-reveal]').forEach((link) => {
    link.href = `mailto:${email}`;
    link.dataset.emailRevealed = 'true';
    link.querySelectorAll('[data-email-text]').forEach((el) => (el.textContent = email));

    // Swap the pre-reveal analytics event for the link's real one.
    const after = link.dataset.umamiAfter;
    if (after) {
      for (const attr of [...link.attributes]) {
        if (attr.name.startsWith('data-umami-event')) link.removeAttribute(attr.name);
      }
      for (const [key, value] of Object.entries(JSON.parse(after) as Record<string, string>)) {
        link.setAttribute(key === 'event' ? 'data-umami-event' : `data-umami-event-${key}`, value);
      }
    }
  });
}

document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[data-email-reveal]');
  if (!link || link.dataset.emailRevealed) return; // revealed: let the mailto open normally
  event.preventDefault();
  if (!event.isTrusted) return;
  getEmail().catch(() => {});
});
