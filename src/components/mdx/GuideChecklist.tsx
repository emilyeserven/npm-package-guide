import { useMemo } from 'react'
import { ChecklistBase } from './ChecklistBase'
import type { ChecklistBaseSection } from './ChecklistBase'

// ── Direct ChecklistBaseSection[] sources ────────────────────────────

import { ARCH_CHECKLIST } from '../../data/archData'
import { CICD_CHECKLIST } from '../../data/cicdChecklist'
import { K8S_CHECKLIST } from '../../data/k8sChecklist'
import { AI_INFRA_CHECKLIST } from '../../data/aiInfraData'
import { NJA_CHECKLIST } from '../../data/njaData'
import { CLAUDEMD_CHECKLIST } from '../../data/promptData'
import { GIT_WORKTREES_CHECKLIST } from '../../data/gitWorktreesData'
import { DEPLOY_CHECKLIST } from '../../data/coolifyData'
import { CMD_REVIEW_CHECKLIST } from '../../data/claudeMdData'

// ── Sources that need transformation ─────────────────────────────────

import { checklistItems } from '../../data/checklistItems'
import { AUTH_CHECKLIST_ITEMS } from '../../data/authData'
import { CHECKLIST_ITEMS as TEST_CHECKLIST_ITEMS } from '../../data/testingData'

// ── Registry ─────────────────────────────────────────────────────────

interface ChecklistEntry {
  title: string
  sections: ChecklistBaseSection[]
}

const PUBLISH_ICONS: Record<string, string> = {
  Build: '\uD83D\uDD27',
  Types: '\uD83D\uDC8E',
  Config: '\u2699\uFE0F',
  Deps: '\uD83D\uDCE6',
  Docs: '\uD83D\uDCDD',
  'Pre-publish': '\uD83D\uDE80',
  Legal: '\uD83D\uDCDC',
}

const AUTH_ICONS: Record<string, string> = {
  Storage: '\uD83D\uDCBE',
  Tokens: '\uD83C\uDFAB',
  Architecture: '\uD83C\uDFD7\uFE0F',
  OAuth: '\uD83D\uDD11',
  Security: '\uD83D\uDEE1\uFE0F',
}

function groupBy<T>(items: T[], key: (item: T) => string, iconMap: Record<string, string>): ChecklistBaseSection[] {
  const categories = [...new Set(items.map(key))]
  return categories.map(cat => ({
    id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: cat,
    icon: iconMap[cat] ?? '\u2705',
    items: items.filter(it => key(it) === cat).map(it => ({ label: (it as Record<string, string>).text })),
  }))
}

const COOLIFY_ICONS: Record<string, string> = {
  'Pre-Deploy': '\u{1F680}',
  Configuration: '\u2699\uFE0F',
  'SPA Routing': '\u{1F517}',
  'Post-Deploy': '\u2705',
  'Raspberry Pi\u2013Specific (if applicable)': '\u{1F353}',
}

const CHECKLIST_REGISTRY: Record<string, ChecklistEntry> = {
  arch:      { title: 'Architecture Checklist',           sections: ARCH_CHECKLIST },
  cicd:      { title: 'CI/CD Checklist',                  sections: CICD_CHECKLIST },
  k8s:       { title: 'Kubernetes Checklist',             sections: K8S_CHECKLIST },
  'ai-infra':{ title: 'AI Infrastructure Checklist',      sections: AI_INFRA_CHECKLIST },
  nja:       { title: 'Next.js Migration Checklist',      sections: NJA_CHECKLIST },
  claudemd:  { title: 'CLAUDE.md Checklist',              sections: CLAUDEMD_CHECKLIST as ChecklistBaseSection[] },
  publish:   { title: 'Publish Checklist',                 sections: groupBy(checklistItems, it => it.cat, PUBLISH_ICONS) },
  auth:      { title: 'Auth Implementation Checklist',     sections: groupBy(AUTH_CHECKLIST_ITEMS, it => it.category, AUTH_ICONS) },
  test:      { title: 'Quick Test Review',                 sections: [{ id: 'review', name: 'Review Criteria', icon: '\uD83D\uDCCB', items: TEST_CHECKLIST_ITEMS.map(it => ({ label: it.label, description: it.detail })) }] },
  'git-worktrees': { title: 'Git Worktrees Checklist',    sections: GIT_WORKTREES_CHECKLIST },
  coolify:   { title: 'Coolify Deploy Checklist',          sections: DEPLOY_CHECKLIST.map(g => ({ id: g.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: g.heading, icon: COOLIFY_ICONS[g.heading] ?? '\u2705', items: g.items.map(label => ({ label })) })) },
  'cmd-review': { title: 'CLAUDE.md Self-Review',        sections: CMD_REVIEW_CHECKLIST },
}

// ── Component ────────────────────────────────────────────────────────

interface GuideChecklistProps {
  checklistId: string
}

export function GuideChecklist({ checklistId }: GuideChecklistProps) {
  const entry = useMemo(() => CHECKLIST_REGISTRY[checklistId], [checklistId])

  if (!entry) return null

  return (
    <ChecklistBase
      markdownTitle={entry.title}
      sections={entry.sections}
    />
  )
}
