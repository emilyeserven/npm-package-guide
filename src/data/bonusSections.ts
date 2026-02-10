import { fnRef } from '../helpers/fnRef'
import type { SectionLink } from '../helpers/renderFootnotes'

export interface BonusSection {
  id: string
  title: string
  intro: string
  content?: { heading: string; text: string }[]
  explainerTitle?: string
  explainerBody?: string
  links?: SectionLink[]
}

export const bonusSections: BonusSection[] = [
  {
    id: "storybook",
    title: "📖 Storybook",
    intro: "Storybook" + fnRef(1) + " is a tool for building and testing UI components in isolation — outside of your app. It creates a standalone workshop where you can develop, document, and visually test every component in every state, without needing to navigate through your actual application to reach that component. Think of it like a visual unit test lab for your UI.",
    content: [
      {
        heading: "What is it?",
        text: "Storybook runs a local dev server that renders your components independently. You write 'stories'" + fnRef(4) + " — small files that describe how to render a component with specific props. Each story is one state of a component: a button in its default state, a loading state, a disabled state, an error state. Storybook then shows all these states side-by-side in a browsable catalog."
      },
      {
        heading: "Why is it important?",
        text: "Without Storybook" + fnRef(2) + ", testing a component in a specific state means navigating through your app, logging in, clicking through menus, and manually triggering that state — every single time. Storybook lets you jump directly to any component in any state instantly. This is especially valuable for edge cases (empty states, error states, long text overflow) that are hard to reproduce in a running app but easy to create as a story."
      },
      {
        heading: "How it helps development",
        text: "Storybook improves your workflow in several ways: it <strong>catches visual bugs</strong> by rendering every component state so you can spot issues before they reach production. It serves as <strong>living documentation</strong> — designers, PMs, and new developers can browse all your components without running the app. It enables <strong>visual regression testing</strong> with tools like Chromatic" + fnRef(3) + " that screenshot every story and diff against the last version. And for <strong>npm packages</strong>, Storybook is practically essential — it's how you develop, test, and showcase your component library to consumers."
      }
    ],
    explainerTitle: "Storybook — a backend analogy",
    explainerBody: "If you've used Swagger/OpenAPI to document and test REST API endpoints independently, Storybook is the UI equivalent. Instead of testing endpoints with different request bodies, you're testing components with different props. Instead of a Swagger UI that lists all your routes, Storybook lists all your components. Both let you interact with individual pieces of your system without booting up the entire application. For package authors, Storybook is even more important — it's like having interactive API documentation that consumers can play with before installing your package.",
    links: [
      { label: "Storybook — Getting Started", url: "https://storybook.js.org/docs/get-started", source: "Storybook" },
      { label: "Storybook — Why Storybook?", url: "https://storybook.js.org/docs/get-started/why-storybook", source: "Storybook" },
      { label: "Chromatic — Visual testing for Storybook", url: "https://www.chromatic.com/", source: "Chromatic" },
      { label: "Storybook — Writing Stories", url: "https://storybook.js.org/docs/writing-stories", source: "Storybook" }
    ]
  }
]

export const bonusIds = bonusSections.map(s => s.id)
