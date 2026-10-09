import { decodeEmail } from '../lib/email';

/**
 * Human check for email links. Any element with `data-email-token` gets its
 * real `mailto:` href (and any `[data-email-text]` child its visible address)
 * only on a trusted click or keypress, so the address never sits in the DOM
 * for a crawler to read. Script-dispatched clicks are ignored.
 */
document.addEventListener(
  'click',
  (event) => {
    if (!event.isTrusted) return;
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[data-email-token]');
    if (!link || link.dataset.emailRevealed) return;

    const address = decodeEmail(link.dataset.emailToken ?? '');
    link.href = `mailto:${address}`;
    link.dataset.emailRevealed = 'true';
    link.querySelectorAll('[data-email-text]').forEach((el) => {
      el.textContent = address;
    });
  },
  // Capture phase: the href must be swapped before the browser follows it.
  { capture: true },
);
