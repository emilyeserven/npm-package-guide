import type { Meta, StoryObj } from '@storybook/react-vite'
import { FnRef } from './FnRef'
import { FootnoteContext } from './FootnoteContext'
import type { SectionLink } from '../../helpers/renderFootnotes'

const MOCK_LINKS: SectionLink[] = [
  { label: 'npm Documentation', url: 'https://docs.npmjs.com/', source: 'npm', note: 'Official npm docs' },
  { label: 'MDN Web Docs', url: 'https://developer.mozilla.org/', source: 'MDN' },
  { label: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', source: 'TypeScript', note: 'TS handbook' },
]

const meta: Meta = {
  title: 'MDX/FnRef',
}

export default meta

export const SingleFootnote: StoryObj = {
  render: () => (
    <FootnoteContext.Provider value={MOCK_LINKS}>
      <p>
        This is a paragraph with a footnote reference <FnRef n={1} /> inline.
      </p>
    </FootnoteContext.Provider>
  ),
}

export const MultipleFootnotes: StoryObj = {
  render: () => (
    <FootnoteContext.Provider value={MOCK_LINKS}>
      <p>
        First reference <FnRef n={1} />, second reference <FnRef n={2} />, and third <FnRef n={3} />.
      </p>
    </FootnoteContext.Provider>
  ),
}
