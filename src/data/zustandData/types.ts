export interface CodeExample {
  id: string
  code: string
  label: string
  variant: 'good' | 'bad' | 'info' | 'neutral'
}

export interface CalloutData {
  type: 'warning' | 'danger' | 'tip' | 'info'
  title: string
  html: string
}

export interface ApiRefEntry {
  method: string
  description: string
}

export interface ZustandStat {
  stat: string
  description: string
}
