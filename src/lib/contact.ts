export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

/**
 * Build a `mailto:` href from contact form values.
 *
 * Browsers do not reliably support POSTing form data to a `mailto:` action
 * (Safari rejects it as an "invalid address"). Instead we construct a standard
 * `mailto:` URL with percent-encoded `subject` and `body` query parameters,
 * which every mail client understands.
 *
 * Values are encoded with `encodeURIComponent`, so spaces become `%20` and
 * newlines become `%0A` — not `+`, which some mail clients render literally.
 */
export function buildMailtoHref(to: string, values: ContactFormValues): string {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  const subject = `Portfolio inquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `mailto:${to}?${query}`;
}
