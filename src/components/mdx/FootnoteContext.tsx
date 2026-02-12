import { createContext } from 'react'
import type { SectionLink } from '../../helpers/renderFootnotes'

export const FootnoteContext = createContext<SectionLink[]>([])
