import type { GuideSection, StartPageData } from './guideTypes'

// ── Guide sections ──────────────────────────────────────────────────

export const COWORK_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['cw-start'] },
  {
    label: 'Getting Started',
    ids: ['cw-overview', 'cw-setup'],
  },
  {
    label: 'Use Cases',
    ids: ['cw-documents', 'cw-gdrive', 'cw-media'],
  },
  {
    label: 'Advanced',
    ids: ['cw-tips'],
  },
]

// ── Start page data ─────────────────────────────────────────────────

export const COWORK_START_PAGE_DATA: StartPageData = {
  subtitle:
    'Transform file organization from tedious manual work into a single conversation with Claude.',
  tip: 'Start with the Overview to understand what Cowork can do, then follow the Setup guide before diving into specific use cases.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Getting Started',
      description:
        'Understand what Cowork is, what it can and cannot do, and how to set it up on your machine.',
      sectionLabel: 'Getting Started',
      subItemDescriptions: {
        'cw-overview': 'What Cowork is, the three main use cases, and a full capability comparison.',
        'cw-setup': 'Install Claude Desktop, subscribe, enable connectors, and grant folder access.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Use Cases',
      description:
        'Step-by-step workflows for local documents, Google Drive, and media server organization.',
      sectionLabel: 'Use Cases',
      subItemDescriptions: {
        'cw-documents': 'Sort downloads, standardize naming, deduplicate, and restructure project folders.',
        'cw-gdrive': 'Search and read cloud documents, sync to local structure, cross-reference files.',
        'cw-media': 'Rename to Plex/Jellyfin conventions, sort media, generate NFO files, audit libraries.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Advanced',
      description:
        'Prompting tips for effective task descriptions and useful plugins for extending Cowork.',
      sectionLabel: 'Advanced',
      subItemDescriptions: {
        'cw-tips': 'Writing effective prompts, useful plugins, and session management advice.',
      },
    },
  ],
}

// ── Overview page data ──────────────────────────────────────────────

export interface OverviewCard {
  icon: string
  title: string
  description: string
}

export const OVERVIEW_CARDS: OverviewCard[] = [
  {
    icon: '\u25A4',
    title: 'Local Documents',
    description: 'Sort downloads, clean up project folders, standardize naming',
  },
  {
    icon: '\u25B3',
    title: 'Google Drive',
    description: 'Search, read, and organize your cloud documents via connector',
  },
  {
    icon: '\u25B6',
    title: 'Media Libraries',
    description: 'Rename media files, fix metadata, restructure libraries',
  },
]

export interface ComparisonRow {
  feature: string
  docs: boolean
  gdrive: boolean
  media: boolean
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Rename & sort files', docs: true, gdrive: true, media: true },
  { feature: 'Read file contents', docs: true, gdrive: true, media: true },
  { feature: 'Create new files', docs: true, gdrive: false, media: true },
  { feature: 'Delete files', docs: true, gdrive: false, media: true },
  { feature: 'Bulk metadata edits', docs: true, gdrive: false, media: true },
  { feature: 'Search across files', docs: true, gdrive: true, media: true },
  { feature: 'Persistent background service', docs: false, gdrive: false, media: false },
  { feature: 'Transcode media', docs: false, gdrive: false, media: false },
]

// ── Step card data (used across multiple pages) ─────────────────────

export interface StepData {
  number: number
  title: string
  description: string
  command?: string
  tip?: string
}

export const SETUP_STEPS: StepData[] = [
  {
    number: 1,
    title: 'Install Claude Desktop',
    description:
      'Download the Claude Desktop app from claude.com/download. Cowork is available on both macOS and Windows with full feature parity.',
    tip: 'Cowork runs locally on your machine \u2014 your files never leave your computer unless you explicitly use a cloud connector.',
  },
  {
    number: 2,
    title: 'Subscribe to a paid plan',
    description:
      'Cowork is available on all paid Claude plans: Pro ($20/month), Max ($100\u2013200/month), Team, and Enterprise. Free-tier users cannot access it.',
    tip: 'Max plans get higher usage limits, which matters for large batch operations on hundreds of files.',
  },
  {
    number: 3,
    title: 'Switch to the "Cowork" tab',
    description:
      'Open Claude Desktop and look for the mode selector at the top. Click the "Cowork" tab (alongside Chat and Code) to enter task mode.',
  },
  {
    number: 4,
    title: 'Grant folder access',
    description:
      'Cowork will ask you to select a folder. It can only read, edit, create, and delete files within the folder you grant access to. Everything runs in a sandboxed environment.',
    tip: 'Start with a single well-scoped folder like ~/Documents/Unsorted or ~/Downloads. You can always expand later.',
  },
  {
    number: 5,
    title: 'Enable connectors (optional)',
    description:
      'Go to Settings \u2192 Connectors \u2192 Browse connectors to enable Google Drive, Notion, Asana, or other services. These connectors let Cowork pull data from external sources and combine it with local file operations.',
  },
]

export const DOCUMENTS_STEPS: StepData[] = [
  {
    number: 1,
    title: 'Sort a chaotic Downloads folder',
    description:
      'Point Cowork at your Downloads folder and ask it to categorize everything. Claude will read file names, peek at contents, and sort files into logical subfolders.',
    command:
      '"Sort all files in this folder into subfolders by type:\nDocuments, Images, Spreadsheets, Code, and Archives.\nRename files with inconsistent naming to use\nkebab-case and remove any trailing (1) or (2) duplicates."',
  },
  {
    number: 2,
    title: 'Standardize naming conventions',
    description:
      'If you have files with inconsistent naming \u2014 mixed casing, dates in different formats, random abbreviations \u2014 Cowork can normalize everything at once.',
    command:
      '"Rename all PDF files in this folder to follow the pattern:\nYYYY-MM-DD_descriptive-name.pdf\nExtract the date from the file contents or metadata\nwhere possible."',
    tip: "Claude reads file contents to infer meaningful names. A file named 'scan0042.pdf' containing a tax return might become '2025-04-15_federal-tax-return.pdf'.",
  },
  {
    number: 3,
    title: 'Deduplicate and clean up',
    description:
      'Find and handle duplicate files, empty folders, and temporary files that accumulate over time.',
    command:
      '"Find all duplicate files in this folder tree\n(by content, not just name). Keep the most recent\ncopy and list the duplicates you\'d remove \u2014 don\'t\ndelete anything until I approve."',
    tip: "Cowork requires explicit permission before deleting files, so you'll always get a chance to review before anything is permanently removed.",
  },
  {
    number: 4,
    title: 'Generate a file inventory',
    description:
      'Create a spreadsheet or markdown summary of everything in a folder, useful for audits or when handing off a project.',
    command:
      '"Create a markdown file called INVENTORY.md listing\nevery file in this folder with: filename, type,\nsize, last modified date, and a one-line description\nof the contents."',
  },
  {
    number: 5,
    title: 'Restructure a project folder',
    description:
      'Reorganize an existing project into a more logical structure based on the actual contents rather than how files were originally dropped in.',
    command:
      '"Analyze the contents of this project folder and\nreorganize it into a clean structure with separate\nfolders for: research, drafts, final-deliverables,\nassets, and reference-materials. Move files\naccordingly and create a README.md explaining\nthe new structure."',
  },
]

export const GDRIVE_STEPS: StepData[] = [
  {
    number: 1,
    title: 'Enable the Google Drive connector',
    description:
      'Navigate to Settings \u2192 Connectors \u2192 Browse connectors and find Google Drive. Authenticate with your Google account to grant read access. Cowork can then search across your entire Drive.',
    tip: 'You can also enable Google Docs, Sheets, and Slides connectors separately for deeper integration with specific file types.',
  },
  {
    number: 2,
    title: 'Search and summarize cloud docs',
    description:
      'Ask Cowork to find and summarize documents spread across your Drive, producing a local report.',
    command:
      '"Search my Google Drive for all documents related to\n\'Q4 budget planning\'. Read each one and create a\nlocal markdown summary file with key points from\neach document, organized by date."',
  },
  {
    number: 3,
    title: 'Sync a Drive folder to local structure',
    description:
      'Pull down content from Drive and organize it alongside your local files.',
    command:
      '"Find all the meeting notes in my Google Drive from\nJanuary 2026. Read the content and create local\nmarkdown copies organized by week:\nweek-1/, week-2/, etc. Include a summary file\nfor each week highlighting action items."',
  },
  {
    number: 4,
    title: 'Cross-reference local and cloud files',
    description:
      'Cowork can compare what\'s in your local folder against what\'s in Drive to find gaps, duplicates, or out-of-sync versions.',
    command:
      '"Compare the files in this local project folder with\nmy Google Drive folder called \'Project Alpha\'.\nCreate a report showing: files only local, files\nonly in Drive, and files that exist in both but\ndiffer in content or date."',
  },
  {
    number: 5,
    title: 'Use Chrome extension for write operations',
    description:
      'For creating or moving files in Drive, pair Cowork with the Claude in Chrome extension. Cowork can prepare files locally, then use the browser to upload them to the correct Drive location.',
    tip: 'The Chrome extension lets Cowork click buttons, navigate tabs, and fill forms in your browser \u2014 enabling full Drive management through the web UI.',
  },
]

export const MEDIA_STEPS: StepData[] = [
  {
    number: 1,
    title: 'Rename media to Plex naming conventions',
    description:
      'Media servers are very particular about naming. Cowork can rename your entire library to match the expected patterns.',
    command:
      '"Rename all video files in this folder to follow\nPlex naming conventions:\n\nMovies: Movie Name (Year)/Movie Name (Year).ext\nTV: Show Name/Season XX/Show Name - SXXEXX - Title.ext\n\nUse the filename and any embedded metadata to\ndetermine the correct name. Create the folder\nstructure as needed."',
    tip: 'Cowork reads file contents and metadata to determine the correct names. For ambiguous files, it will ask you to confirm before renaming.',
  },
  {
    number: 2,
    title: 'Sort a dump folder into your library',
    description:
      'When you have a folder of freshly downloaded media that needs to be moved into your organized library structure.',
    command:
      '"Sort all media files in this \'incoming\' folder into\nmy existing library structure. Movies go into\n/Movies/Movie Name (Year)/, TV shows go into\n/TV Shows/Show Name/Season XX/.\nCreate any missing folders. Move (don\'t copy)\nthe files and clean up empty folders afterward."',
  },
  {
    number: 3,
    title: 'Generate NFO metadata files',
    description:
      'Create .nfo files that media servers use for metadata, including title, year, plot summary, and other details.',
    command:
      '"For each movie folder that\'s missing an .nfo file,\ncreate one with the following XML structure:\n<movie><title>...</title><year>...</year>\n<plot>...</plot></movie>\nUse web search to find accurate metadata for each\nmovie based on the folder name."',
    tip: 'Cowork can use web search during tasks to look up accurate movie/show metadata like plot summaries, cast, and release dates.',
  },
  {
    number: 4,
    title: 'Audit your media library',
    description:
      'Create a comprehensive report of your library\'s health \u2014 missing episodes, inconsistent naming, files without metadata.',
    command:
      '"Audit this TV show library and create a report:\n- Shows with missing episodes (identify gaps)\n- Files that don\'t match naming conventions\n- Folders missing subtitle files\n- Duplicate episodes (different qualities)\nOutput as a markdown report with a summary and\nper-show breakdown."',
  },
  {
    number: 5,
    title: 'Manage subtitle files',
    description:
      'Organize subtitle files, match them to their media files, and standardize naming so media servers pick them up correctly.',
    command:
      '"Find all .srt and .ass subtitle files in this\nlibrary. Rename them to match their companion\nvideo file using Plex subtitle naming:\nMovieName (Year).en.srt for English,\nMovieName (Year).es.srt for Spanish, etc.\nMove orphaned subtitles to an \'unmatched\' folder."',
  },
]

// ── Media capabilities data ─────────────────────────────────────────

export interface CapabilityItem {
  label: string
  supported: boolean
}

export const MEDIA_CAPABILITIES: CapabilityItem[] = [
  { label: 'Rename files to Plex/Jellyfin conventions', supported: true },
  { label: 'Create folder structures (Movie/Show/Season)', supported: true },
  { label: 'Sort unsorted media into correct locations', supported: true },
  { label: 'Generate NFO metadata files', supported: true },
  { label: 'Find and flag duplicates', supported: true },
  { label: 'Create subtitle file inventories', supported: true },
  { label: 'Transcode video/audio formats', supported: false },
  { label: 'Manage running server processes', supported: false },
  { label: 'Run as persistent background service', supported: false },
]

// ── Pro tips data ───────────────────────────────────────────────────

export interface PromptTip {
  label: string
  example: string
}

export const PROMPT_TIPS: PromptTip[] = [
  {
    label: 'Be specific about structure',
    example: "Use 'sort into folders named A, B, C' instead of 'organize this'.",
  },
  {
    label: 'Specify what NOT to do',
    example: "Say 'don't delete any files' or 'skip hidden files starting with .'.",
  },
  {
    label: 'Ask for a dry run first',
    example: "Say 'show me what you'd do before making changes' to preview the plan.",
  },
  {
    label: 'Set naming patterns explicitly',
    example: "Provide a concrete pattern like 'YYYY-MM-DD_name.ext' rather than 'use consistent names'.",
  },
  {
    label: 'Use global instructions for repeated preferences',
    example: 'Set folder or global instructions so Cowork always follows your conventions without re-stating them.',
  },
]

export interface PluginData {
  name: string
  description: string
  tags: string[]
}

export const PLUGINS: PluginData[] = [
  {
    name: 'Productivity Plugin',
    description:
      'Manage tasks, calendars, and workflows. Useful for organizing project folders alongside task tracking.',
    tags: ['built-in', 'task-management', 'workflows'],
  },
  {
    name: 'Enterprise Search Plugin',
    description:
      'Find information across company tools and documents. Great for pulling data from multiple sources into organized local folders.',
    tags: ['built-in', 'cross-tool', 'search'],
  },
  {
    name: 'Plugin Create',
    description:
      'Build your own custom plugins. Create a media-library-specific plugin with your exact naming conventions and folder structures baked in.',
    tags: ['built-in', 'meta', 'customization'],
  },
]

// ── Lookup helpers ──────────────────────────────────────────────────

const STEP_MAP: Record<string, StepData[]> = {
  'cw-setup': SETUP_STEPS,
  'cw-documents': DOCUMENTS_STEPS,
  'cw-gdrive': GDRIVE_STEPS,
  'cw-media': MEDIA_STEPS,
}

export function getStepsForPage(pageId: string): StepData[] {
  return STEP_MAP[pageId] ?? []
}
