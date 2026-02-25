import type { GlossaryCategory } from './types'

export const coworkGlossary: GlossaryCategory[] = [
  {
    category: 'Cowork \u2014 Core Concepts',
    terms: [
      {
        term: 'Cowork',
        definition:
          'A task mode in Claude Desktop (alongside Chat and Code) designed for file organization. Cowork reads, renames, sorts, creates, and deletes files within a user-granted folder, running locally in a sandboxed environment.',
        linkId: 'cw-claude-desktop',
        sectionId: 'cw-overview',
      },
      {
        term: 'Connector (Cowork)',
        definition:
          'An integration that lets Cowork access external services like Google Drive, Notion, or Asana. Connectors are enabled in Settings \u2192 Connectors and typically provide read access to cloud data that can be combined with local file operations.',
        linkId: 'cw-claude-desktop',
        sectionId: 'cw-setup',
      },
      {
        term: 'Global Instructions (Cowork)',
        definition:
          'Persistent preferences saved at the folder or global level so Cowork follows your conventions (naming patterns, folder structures, exclusions) automatically without re-stating them each session.',
        linkId: 'cw-claude-desktop',
        sectionId: 'cw-tips',
      },
      {
        term: 'NFO File',
        definition:
          'An XML metadata file used by media servers like Plex, Jellyfin, and Emby. Contains title, year, plot summary, and other details that the server uses instead of (or alongside) online metadata lookups.',
        linkId: 'cw-plex-naming',
        sectionId: 'cw-media',
      },
      {
        term: 'Plex Naming Convention',
        definition:
          'The file and folder naming pattern required by Plex for automatic metadata matching. Movies use <code>Movie Name (Year)/Movie Name (Year).ext</code>; TV shows use <code>Show Name/Season XX/Show Name - SXXEXX - Title.ext</code>.',
        linkId: 'cw-plex-naming',
        sectionId: 'cw-media',
      },
    ],
  },
]
