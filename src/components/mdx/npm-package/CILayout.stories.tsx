import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CIStep, CIStepText, CIYaml, YamlHeading, CITip,
  CIOverviewCards, CIOverviewCard, CIFullExample,
  AiPromptsAccordion, MaintenanceTool, GoodTestsList,
} from './CILayout'

const meta: Meta = {
  title: 'MDX/NPM Package/CILayout',
}

export default meta

export const ComposedCIStep: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CIStep heading="Install Dependencies" id="toc-install">
        <CIStepText>
          Install all project dependencies before running any CI checks.
        </CIStepText>
        <YamlHeading />
        <CIYaml>
          {'- name: Install\n  run: npm ci'}
        </CIYaml>
        <CITip>
          Use <code>npm ci</code> instead of <code>npm install</code> for deterministic builds.
        </CITip>
      </CIStep>
    </div>
  ),
}

export const OverviewCards: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CIOverviewCards>
        <CIOverviewCard num={1} title="Lint" yaml="run: npm run lint" />
        <CIOverviewCard num={2} title="Test" yaml="run: npm test" />
        <CIOverviewCard num={3} title="Build" />
      </CIOverviewCards>
    </div>
  ),
}

export const FullExample: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <CIFullExample>
        {'name: CI\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n      - run: npm run build'}
      </CIFullExample>
    </div>
  ),
}

export const AiPrompts: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <AiPromptsAccordion prompts={[
        { label: 'Write unit tests', prompt: 'Write unit tests for the UserService class covering all public methods.' },
        { label: 'Add integration test', prompt: 'Write an integration test that verifies the user creation flow end-to-end.' },
      ]} />
    </div>
  ),
}

export const MaintenanceToolExample: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <MaintenanceTool
        name="Renovate"
        emoji={'\u{1F916}'}
        desc={<>Automated dependency update tool that creates PRs for outdated packages.</>}
        why={<>Keeps dependencies secure and up-to-date without manual tracking.</>}
        yaml={'- name: Renovate\n  uses: renovatebot/github-action@v40'}
      />
    </div>
  ),
}

export const GoodTestsListExample: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <GoodTestsList>
        <li>Tests pass in CI consistently</li>
        <li>Tests are independent of each other</li>
        <li>Tests run in under 5 minutes total</li>
      </GoodTestsList>
    </div>
  ),
}
