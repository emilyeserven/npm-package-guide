import { useNavigate } from '@tanstack/react-router'

interface GuideTile {
  id: string
  icon: string
  title: string
  description: string
}

const guides: GuideTile[] = [
  {
    id: 'npm-package',
    icon: '\u{1F4E6}',
    title: 'Web App vs. NPM Package',
    description:
      'Learn the differences between building a web app and an npm package, from project setup through CI/CD and publishing.',
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
                params: { sectionId: 'roadmap' },
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
    </div>
  )
}
