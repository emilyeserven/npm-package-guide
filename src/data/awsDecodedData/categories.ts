import type { AwsCategoryId, AwsCategory } from './types'

export const AWS_CATEGORIES: Record<AwsCategoryId, AwsCategory> = {
  compute:      { label: 'Compute',                 icon: '\u26A1',       color: '#ff8243' },
  storage:      { label: 'Storage',                  icon: '\u{1F4E6}',   color: '#5b9cf5' },
  database:     { label: 'Database',                 icon: '\u{1F5C4}\uFE0F', color: '#a78bfa' },
  networking:   { label: 'Networking',               icon: '\u{1F310}',   color: '#2dd4bf' },
  security:     { label: 'Security',                 icon: '\u{1F512}',   color: '#f472b6' },
  serverless:   { label: 'Serverless',               icon: '\u{1F680}',   color: '#fbbf24' },
  containers:   { label: 'Containers',               icon: '\u{1F433}',   color: '#4ecb8d' },
  devtools:     { label: 'Developer Tools',          icon: '\u{1F6E0}\uFE0F', color: '#f87171' },
  ai_ml:        { label: 'AI & Machine Learning',    icon: '\u{1F9E0}',   color: '#c084fc' },
  monitoring:   { label: 'Monitoring & Management',  icon: '\u{1F4CA}',   color: '#fb923c' },
  frontend_web: { label: 'Frontend & Web',           icon: '\u{1F3A8}',   color: '#38bdf8' },
}

export const LEVEL_COLORS: Record<string, string> = {
  beginner: '#4ecb8d',
  intermediate: '#fbbf24',
  advanced: '#f87171',
}
