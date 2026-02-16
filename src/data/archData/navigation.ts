import type { GuideSection, StartPageData } from '../guideTypes'

export const ARCH_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['arch-start', 'arch-what-is-a-stack'] },
  { label: 'Stack Alternatives', ids: [
    'arch-stack-mern', 'arch-stack-pfrn', 'arch-stack-mean',
    'arch-stack-lamp', 'arch-stack-django', 'arch-stack-rails',
  ]},
  { label: 'Full-Stack Frameworks', ids: [
    'arch-frameworks-intro', 'arch-fw-nextjs', 'arch-fw-react-router',
    'arch-fw-tanstack-start', 'arch-fw-remix',
  ]},
  { label: 'Putting It Together', ids: ['arch-how-it-connects'] },
]

// ── Start page data ──────────────────────────────────────────────────

export const ARCH_START_PAGE_DATA: StartPageData = {
  subtitle: 'A beginner\u2019s guide to web application tech stacks \u2014 from first principles to comparing real-world alternatives.',
  tip: 'Each section includes analogies and explanations designed for backend engineers.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'What is a Stack?',
      description: 'Learn what a tech stack is, how the four essential layers work together, and why swapping components is a key architectural skill.',
      jumpTo: 'arch-what-is-a-stack',
    },
    {
      type: 'bonus',
      title: 'Stack Alternatives',
      description: 'Explore six popular stacks in depth. Each covers the technologies involved, how they work together, and their strengths and tradeoffs.',
      sectionLabel: 'Stack Alternatives',
      subItemDescriptions: {
        'arch-stack-mern': 'The most popular all-JavaScript stack \u2014 MongoDB, Express, React, Node.js. Great for learning and rapid prototyping.',
        'arch-stack-pfrn': 'A modified MERN stack with PostgreSQL + Fastify for better performance and data integrity. This is the stack explored throughout this guide.',
        'arch-stack-mean': 'Like MERN but with Angular instead of React \u2014 a full framework for enterprise teams that want consistent structure.',
        'arch-stack-lamp': 'The classic stack that powered the early internet \u2014 Linux, Apache, MySQL, PHP. Battle-tested for decades.',
        'arch-stack-django': 'Python-powered with batteries included \u2014 PostgreSQL, Django, React/Vue, Python. Excellent for teams that know Python.',
        'arch-stack-rails': 'Ruby-powered and famous for developer happiness \u2014 PostgreSQL, Ruby on Rails, Hotwire/React, Ruby.',
      },
    },
    {
      type: 'bonus',
      title: 'Full-Stack Frameworks',
      description: 'Explore four React-based full-stack frameworks that handle server rendering, routing, and data fetching as a unified package.',
      sectionLabel: 'Full-Stack Frameworks',
      subItemDescriptions: {
        'arch-fw-nextjs': 'The most popular React framework by Vercel \u2014 server rendering, file-system routing, and built-in optimizations. The safe default for production React apps.',
        'arch-fw-react-router': 'React Router v7\u2019s full-stack mode \u2014 built on web standards, progressive enhancement, and 10+ years of battle-tested routing.',
        'arch-fw-tanstack-start': 'The newest entry with best-in-class TypeScript support \u2014 end-to-end type safety from the TanStack ecosystem.',
        'arch-fw-remix': 'The pioneering web-standards framework that merged into React Router v7. Its ideas shaped modern React frameworks.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'How it all Connects',
      description: 'Trace a user action through every layer of the stack \u2014 from button click to database query and back to the screen.',
      jumpTo: 'arch-how-it-connects',
    },
  ],
}

