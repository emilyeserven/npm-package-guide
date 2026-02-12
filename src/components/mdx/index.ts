import type { MDXComponents } from 'mdx/types'
import { Cmd } from './Cmd'
import { FnRef } from './FnRef'
import { NavLink, NavPill } from './NavLink'
import { StepJump } from './StepJump'
import { TocLink } from './TocLink'
import { SectionIntro, Toc, Explainer, Gotcha, ColItem, SectionNote, CodeBlock } from './SectionLayout'
import {
  CIStep, CIStepText, CIYaml, YamlHeading, CITip, CIOverviewCards, CIOverviewCard,
  CIFullExample, AiPromptsAccordion, MaintenanceTool, GoodTestsList,
} from './CILayout'
import { StackExplorer } from './StackExplorer'
import { StackProsCons } from './StackProsCons'
import { DataFlowDiagram } from './DataFlowDiagram'
import { LayerDiagram } from './LayerDiagram'

export const mdxComponents: MDXComponents = {
  Cmd,
  FnRef,
  NavLink,
  NavPill,
  StepJump,
  TocLink,
  SectionIntro,
  Toc,
  Explainer,
  Gotcha,
  ColItem,
  SectionNote,
  CodeBlock,
  CIStep,
  CIStepText,
  CIYaml,
  YamlHeading,
  CITip,
  CIOverviewCards,
  CIOverviewCard,
  CIFullExample,
  AiPromptsAccordion,
  MaintenanceTool,
  GoodTestsList,
  StackExplorer,
  StackProsCons,
  DataFlowDiagram,
  LayerDiagram,
}
