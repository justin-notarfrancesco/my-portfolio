/**
 * Server-only. Imported solely by the on-demand `/api/email` route, so the
 * address never appears in prerendered HTML or the client bundle — it is only
 * handed out after a Turnstile check passes.
 */
export const EMAIL = 'justinnotar@gmail.com';
