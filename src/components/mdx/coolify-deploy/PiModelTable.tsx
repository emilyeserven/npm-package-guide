import { PI_MODELS } from '../../../data/coolifyData'

export function PiModelTable() {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider">
              Model
            </th>
            <th className="text-left p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider">
              RAM
            </th>
            <th className="text-left p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider">
              Verdict
            </th>
          </tr>
        </thead>
        <tbody>
          {PI_MODELS.map(row => (
            <tr key={row.model}>
              <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200">
                {row.model}
              </td>
              <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                {row.ram}
              </td>
              <td className="p-2.5 border border-slate-200 dark:border-slate-700" style={{ color: row.verdictColor }}>
                {row.verdict}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
