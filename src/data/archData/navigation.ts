import type { GuideSection } from '../guideTypes'

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

export const ARCH_NAV_ORDER = ARCH_GUIDE_SECTIONS.flatMap(s => s.ids)
export const ARCH_PAGE_IDS = new Set(ARCH_NAV_ORDER)
