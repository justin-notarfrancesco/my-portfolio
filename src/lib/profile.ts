/**
 * Profile content shared by the homepage and the About page, so the
 * recruiter quick-scan and the skills index can't drift apart.
 */

export const LINKEDIN_URL = 'https://www.linkedin.com/in/justin-notarfrancesco/';
export const GITHUB_URL = 'https://github.com/justin-notarfrancesco';

// Recruiter quick-scan: experience, stack, focus, and working hours.
// Each route bullet is a mnemonic for its stat: 5 for 5+, R for React,
// D for Discovery, E for Eastern.
export const stats = [
  { value: '5+', label: 'Years Experience', line: '5' },
  // Non-breaking spaces keep each value from stranding one word on a line.
  { value: 'React\u00a0+\u00a0TS', label: 'Core Stack', line: 'R' },
  { value: 'Search & Discovery', label: 'Favorite Problem', line: 'D' },
  { value: 'US\u00a0Eastern', label: 'Time Zone', line: 'E' },
];

// Skills grouped like a service guide. Bullets are mnemonics where a route
// letter fits: C for Core, F for Frameworks, D for Discovery (the Focus
// group leads with it, as the stats do), Q for Quality, L for pLatform.
export const skillGroups = [
  { line: 'C', title: 'Core', skills: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  { line: 'F', title: 'Frameworks', skills: ['React', 'Next.js', 'Astro', 'Tailwind CSS'] },
  { line: 'D', title: 'Focus', skills: ['Search and discovery UX', 'Frontend architecture', 'Web performance', 'Design systems'] },
  { line: 'Q', title: 'Quality', skills: ['Jest', 'Playwright', 'Storybook', 'Accessibility'] },
  { line: 'L', title: 'Platform', skills: ['REST APIs', 'Vite', 'Vercel', 'Claude Code'] },
];
