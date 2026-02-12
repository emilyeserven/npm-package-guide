import { useNavigate } from '@tanstack/react-router'

interface GuideTile {
  id: string
  sectionId: string
  icon: string
  title: string
  description: string
}

interface ResourceTile {
  sectionId: string
  icon: string
  title: string
  description: string
}

const resources: ResourceTile[] = [
  {
    sectionId: 'external-resources',
    icon: '\u{1F4DA}',
    title: 'External Resources',
    description:
      'Curated documentation, articles, courses, tools, and section references — all in one searchable, filterable table.',
  },
  {
    sectionId: 'glossary',
    icon: '\u{1F4D6}',
    title: 'Glossary',
    description:
      'Key terms you\'ll encounter across all guides, with links to relevant sections and external documentation.',
  },
]

const guides: GuideTile[] = [
  {
    id: 'npm-package',
    sectionId: 'roadmap',
    icon: '\u{1F4E6}',
    title: 'Web App vs. NPM Package',
    description:
      'Learn the differences between building a web app and an npm package, from project setup through CI/CD and publishing.',
  },
  {
    id: 'architecture',
    sectionId: 'arch-start',
    icon: '\u{1F3D7}\uFE0F',
    title: 'Architecture Guide',
    description:
      'Understand common frontend architecture patterns and how to structure your projects for maintainability and scale.',
  },
  {
    id: 'prompt-engineering',
    sectionId: 'prompt-start',
    icon: '\u{1F9E0}',
    title: 'Prompt Engineering',
    description:
      'Practical patterns for working with AI coding assistants \u2014 common mistakes to watch for, context management techniques, and CLI commands.',
  },
]

export function GuidesIndexPage() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Frontend Guides</h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm">
          Practical guides for backend engineers stepping into the frontend world.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
        {guides.map((guide) => (
          <button
            key={guide.id}
            className="flex flex-col items-start text-left p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
            onClick={() =>
              navigate({
                to: '/$sectionId',
                params: { sectionId: guide.sectionId },
              })
            }
          >
            <span className="text-3xl mb-3">{guide.icon}</span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              {guide.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {guide.description}
            </p>
          </button>
        ))}

        <div className="flex flex-col items-start text-left p-6 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl">
          <span className="text-3xl mb-3">{'\u{1F6A7}'}</span>
          <h2 className="text-lg font-bold text-slate-400 dark:text-slate-500 mb-2">
            More to come...
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
            Additional guides are in the works. Stay tuned!
          </p>
        </div>
      </div>

      {/* Resources section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold tracking-tight mb-1 text-slate-900 dark:text-slate-100">Resources</h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-5">
          Cross-guide references and learning materials.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <button
              key={resource.sectionId}
              className="flex flex-col items-start text-left p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
              onClick={() =>
                navigate({
                  to: '/$sectionId',
                  params: { sectionId: resource.sectionId },
                })
              }
            >
              <span className="text-2xl mb-2">{resource.icon}</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                {resource.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {resource.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
