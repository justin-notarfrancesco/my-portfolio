import { encodeEmail } from './email';

/**
 * Server-only. Import this from Astro frontmatter, never from a client
 * `<script>`, or the plain address ships in the JS bundle. Pages should render
 * `EMAIL_TOKEN`, not `EMAIL`.
 */
const EMAIL = 'justinnotar@gmail.com';

export const EMAIL_TOKEN = encodeEmail(EMAIL);
