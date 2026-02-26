import type { RegistryLink } from './types'

export const coworkLinks: RegistryLink[] = [
  {
    id: 'cw-claude-desktop',
    url: 'https://claude.ai/download',
    label: 'Claude Desktop Download',
    source: 'Anthropic',
    desc: 'Download Claude Desktop for macOS or Windows \u2014 required for Cowork file organization tasks.',
    tags: ['docs', 'free', 'guide:cowork'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'cw-claude-pricing',
    url: 'https://www.anthropic.com/pricing',
    label: 'Claude Pricing',
    source: 'Anthropic',
    desc: 'Pricing details for Claude Pro, Max, Team, and Enterprise plans \u2014 Cowork requires a paid plan.',
    tags: ['docs', 'free', 'guide:cowork'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'cw-plex-naming',
    url: 'https://support.plex.tv/articles/naming-and-organizing-your-movie-media-files/',
    label: 'Plex Naming Conventions',
    source: 'Plex',
    desc: 'Official Plex documentation on naming and organizing movie and TV media files for automatic metadata matching.',
    tags: ['docs', 'free', 'guide:cowork'],
    resourceCategory: 'Learning Resources',
  },
  {
    id: 'cw-jellyfin-naming',
    url: 'https://jellyfin.org/docs/general/server/media/movies/',
    label: 'Jellyfin Media Organization',
    source: 'Jellyfin',
    desc: 'Jellyfin documentation on organizing and naming media files for library scanning.',
    tags: ['docs', 'free', 'guide:cowork'],
    resourceCategory: 'Learning Resources',
  },
  {
    id: 'cw-gdrive-api',
    url: 'https://developers.google.com/drive',
    label: 'Google Drive API',
    source: 'Google',
    desc: 'Google Drive developer documentation \u2014 background on the API that powers the Cowork Drive connector.',
    tags: ['docs', 'free', 'guide:cowork'],
    resourceCategory: 'Learning Resources',
  },
]
