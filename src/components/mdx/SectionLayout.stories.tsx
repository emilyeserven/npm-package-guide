import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  SectionTitle,
  SectionIntro,
  Toc,
  SectionSubheading,
  SectionList,
  ColItem,
  Explainer,
  Gotcha,
  SectionNote,
} from './SectionLayout'
import { TocLink } from './TocLink'

const meta: Meta = {
  title: 'MDX/SectionLayout',
}

export default meta

export const FullPageLayout: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SectionTitle>Build & Output ⚙️</SectionTitle>

      <Toc>
        <TocLink id="toc-bundlers">Bundlers</TocLink>
        <TocLink id="toc-output">Output formats</TocLink>
      </Toc>

      <SectionIntro>
        This section covers <strong>build tools</strong> and output configuration.
        <ul>
          <li>Understand bundler options</li>
          <li>Configure output formats</li>
        </ul>
      </SectionIntro>

      <SectionSubheading id="toc-bundlers">Bundlers</SectionSubheading>
      <SectionList>
        <ColItem>Vite is a fast build tool for modern web projects.</ColItem>
        <ColItem>Webpack is the most widely used bundler in the ecosystem.</ColItem>
        <ColItem>Rollup is ideal for library builds with tree-shaking support.</ColItem>
      </SectionList>

      <Explainer title="Why bundlers matter">
        Bundlers transform your source code into optimized files for production.
        They handle module resolution, code splitting, and asset optimization.
      </Explainer>

      <Gotcha>
        Make sure to configure your bundler for both ESM and CJS output if your
        package needs to support both module systems.
      </Gotcha>

      <SectionNote>
        Tip: Use Vite for the fastest development experience with hot module replacement.
      </SectionNote>
    </div>
  ),
}

export const SectionTitleOnly: StoryObj = {
  render: () => <SectionTitle>Dependencies 📦</SectionTitle>,
}

export const SectionNoteOnly: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SectionNote>
        This is an informational note that highlights important details.
      </SectionNote>
    </div>
  ),
}
