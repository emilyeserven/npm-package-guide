import { contentPages } from '../content/registry'
import { STACK_PAGES, FRAMEWORK_PAGES } from '../data/archData'
import { PrevNextNav } from './PrevNextNav'
import { JumpButton } from './JumpButton'

const stackDescriptions: Record<string, string> = {
  mern: 'The most popular all-JavaScript stack — MongoDB, Express, React, Node.js. Great for learning and rapid prototyping.',
  pfrn: 'A modified MERN stack with PostgreSQL + Fastify for better performance and data integrity. This is the stack explored throughout this guide.',
  mean: 'Like MERN but with Angular instead of React — a full framework for enterprise teams that want consistent structure.',
  lamp: 'The classic stack that powered the early internet — Linux, Apache, MySQL, PHP. Battle-tested for decades.',
  django: 'Python-powered with batteries included — PostgreSQL, Django, React/Vue, Python. Excellent for teams that know Python.',
  rails: 'Ruby-powered and famous for developer happiness — PostgreSQL, Ruby on Rails, Hotwire/React, Ruby.',
}

const frameworkDescriptions: Record<string, string> = {
  nextjs: 'The most popular React framework by Vercel — server rendering, file-system routing, and built-in optimizations. The safe default for production React apps.',
  'react-router': 'React Router v7\'s full-stack mode — built on web standards, progressive enhancement, and 10+ years of battle-tested routing.',
  'tanstack-start': 'The newest entry with best-in-class TypeScript support — end-to-end type safety from the TanStack ecosystem.',
  remix: 'The pioneering web-standards framework that merged into React Router v7. Its ideas shaped modern React frameworks.',
}

export function ArchStartPage() {
  const whatIsPage = contentPages.get('arch-what-is-a-stack')
  const whatIsLabel = whatIsPage?.title ?? '\u{1F4DA} What is a Stack?'
  const connectsPage = contentPages.get('arch-how-it-connects')
  const connectsLabel = connectsPage?.title ?? '\u{1F504} How it all Connects'

  return (
    <>
      <div>
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Architecture Guide</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-1">A beginner&apos;s guide to web application tech stacks — from first principles to comparing real-world alternatives.</p>
          <p className="text-gray-400 dark:text-slate-500 text-sm mb-0">{'\u{1F4A1}'} Each section includes analogies and explanations designed for backend engineers.</p>
        </div>

        <h2 className="text-2xl font-bold mb-5 tracking-tight">{'\u{1F4DA}'} Learning Path</h2>

        {/* Step 1: What is a Stack? */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">1</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">What is a Stack?</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Learn what a tech stack is, how the four essential layers work together, and why swapping components is a key architectural skill.</div>
            <JumpButton jumpTo="arch-what-is-a-stack">{'\u2192'} Deep dive: {whatIsLabel}</JumpButton>
          </div>
        </div>

        {/* Bonus: Stack Alternatives */}
        <div className="step-card bonus-step flex gap-4 py-4.5 relative mt-7 pt-6 border-t-2 border-dashed border-slate-300 dark:border-slate-600">
          <div className="step-number bonus-number w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0 relative">{'\u2605'}</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Stack Alternatives</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Explore six popular stacks in depth. Each covers the technologies involved, how they work together, and their strengths and tradeoffs.</div>
            {STACK_PAGES.map(stack => {
              const pageId = `arch-stack-${stack.id}`
              const page = contentPages.get(pageId)
              const title = page?.title ?? stack.name
              const desc = stackDescriptions[stack.id] ?? stack.overview
              return (
                <div key={stack.id} className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{title}</h3>
                  <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">{desc}</div>
                  <JumpButton jumpTo={pageId}>{'\u2192'} Deep dive: {title}</JumpButton>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bonus: Full-Stack Frameworks */}
        <div className="step-card bonus-step flex gap-4 py-4.5 relative mt-7 pt-6 border-t-2 border-dashed border-slate-300 dark:border-slate-600">
          <div className="step-number bonus-number w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0 relative">{'\u2605'}</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Full-Stack Frameworks</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Explore four React-based full-stack frameworks that handle server rendering, routing, and data fetching as a unified package.</div>
            {(() => {
              const fwIntroPage = contentPages.get('arch-frameworks-intro')
              const fwIntroLabel = fwIntroPage?.title ?? '\u{1F3E0} Full-Stack Frameworks'
              return <JumpButton jumpTo="arch-frameworks-intro">{'\u2192'} Overview: {fwIntroLabel}</JumpButton>
            })()}
            {FRAMEWORK_PAGES.map(fw => {
              const pageId = `arch-fw-${fw.id}`
              const page = contentPages.get(pageId)
              const title = page?.title ?? fw.name
              const desc = frameworkDescriptions[fw.id] ?? fw.overview
              return (
                <div key={fw.id} className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{title}</h3>
                  <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">{desc}</div>
                  <JumpButton jumpTo={pageId}>{'\u2192'} Deep dive: {title}</JumpButton>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 2: How it all Connects */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative last:border-b-0">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">2</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">How it all Connects</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Trace a user action through every layer of the stack — from button click to database query and back to the screen.</div>
            <JumpButton jumpTo="arch-how-it-connects">{'\u2192'} Deep dive: {connectsLabel}</JumpButton>
          </div>
        </div>
      </div>
      <PrevNextNav currentId="arch-start" />
    </>
  )
}
