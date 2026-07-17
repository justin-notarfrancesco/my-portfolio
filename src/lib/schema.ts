/**
 * Shared JSON-LD entities. The Person object is the single source of truth
 * for who Justin is — every page that emits schema references it by @id so
 * search engines and AI crawlers consolidate one entity, not three.
 */

export const SITE_URL = 'https://notar.nyc';
export const PERSON_ID = `${SITE_URL}/#justin`;

export const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Justin Notarfrancesco',
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  jobTitle: 'Senior Frontend Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'JPMorgan Chase',
    url: 'https://www.jpmorganchase.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  email: 'mailto:justin@notar.nyc',
  sameAs: [
    'https://github.com/justin-notarfrancesco',
    'https://www.linkedin.com/in/justin-notarfrancesco/',
  ],
  knowsAbout: [
    'Frontend engineering',
    'Financial interfaces',
    'Fintech',
    'Design systems',
    'TypeScript',
    'React',
    'Web accessibility (WCAG)',
    'Data visualization',
    'Web performance',
  ],
};

/** Minimal by-reference form for pages where PERSON is the author, not the subject. */
export const PERSON_REF = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Justin Notarfrancesco',
  url: SITE_URL,
};
