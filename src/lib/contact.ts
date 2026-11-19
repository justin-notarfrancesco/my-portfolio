export interface ContactFormValues {
  name: string;
  message: string;
}

/**
 * Build a `mailto:` href with a default subject for direct email links,
 * or a personalized subject and the visitor's message for contact form drafts.
 *
 * Browsers do not reliably support POSTing form data to a `mailto:` action
 * (Safari rejects it as an "invalid address"). Instead we construct a standard
 * `mailto:` URL with percent-encoded `subject` and `body` query parameters,
 * which every mail client understands.
 *
 * Values are encoded with `encodeURIComponent`, so spaces become `%20` and
 * newlines become `%0A` — not `+`, which some mail clients render literally.
 */
export function buildMailtoHref(to: string, values?: ContactFormValues): string {
  const name = values?.name.trim();
  const subject = name ? `New message from ${name} via portfolio site` : 'New message via portfolio site';

  let query = `subject=${encodeURIComponent(subject)}`;
  if (values) query += `&body=${encodeURIComponent(values.message.trim())}`;
  return `mailto:${to}?${query}`;
}
