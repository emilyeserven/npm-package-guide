// Severity badge colors for Common AI Mistakes guide pages.
// Shared between Sidebar and CommandMenu.
export const severityBadges: Record<string, { letter: string; cls: string }> = {
  'prompt-mistakes-logic': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-apis': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-react': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-security': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-structural': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-design': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-tailwind': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-testing': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-style': { letter: 'L', cls: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' },
}
