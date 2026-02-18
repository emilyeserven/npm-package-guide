import type { MDXComponents } from 'mdx/types'
import { Cmd } from './Cmd'
import { FnRef } from './FnRef'
import { NavLink, NavPill } from './NavLink'
import { StepJump } from './StepJump'
import { TocLink } from './TocLink'
import { SectionIntro, Toc, Explainer, Gotcha, ColItem, SectionNote, SectionTitle, SectionSubheading, SectionList, CodeAccordion, MdxPre, DefinitionTable, DefRow } from './SectionLayout'
// shared
import { GuideStartContent } from './GuideStartContent'
import { GuideChecklist } from './GuideChecklist'
// npm-package
import {
  CIStep, CIStepText, CIYaml, YamlHeading, CITip, CIOverviewCards, CIOverviewCard,
  CIFullExample, AiPromptsAccordion, MaintenanceTool, GoodTestsList,
} from './npm-package/CILayout'
import { RoadmapSteps } from './npm-package/RoadmapSteps'
// architecture
import { StackExplorer } from './architecture/StackExplorer'
import { StackProsCons, FrameworkProsCons } from './architecture/ArchProsCons'
import { DataFlowDiagram } from './architecture/DataFlowDiagram'
import { LayerDiagram } from './architecture/LayerDiagram'
import { FrameworkExplorer } from './architecture/FrameworkExplorer'
// testing
import { TestingPyramid } from './testing/TestingPyramid'
import { TestTypeDetail } from './testing/TestTypeDetail'
import { TestPracticeCards } from './testing/TestPracticeCards'
import { TestToolsGrid } from './testing/TestToolsGrid'
// prompt-engineering
import { SeverityBadge } from './prompt-engineering/SeverityBadge'
import { MistakeList } from './prompt-engineering/MistakeList'
import { TechniqueDetail } from './prompt-engineering/TechniqueDetail'
import { CLIReference } from './prompt-engineering/CLIReference'
import { TestingMistakes } from './prompt-engineering/TestingMistakes'
import { ToolDetail } from './prompt-engineering/ToolDetail'
import { MetaTooling } from './prompt-engineering/MetaTooling'
import { CodingToolExplorer } from './prompt-engineering/CodingToolExplorer'
import { ToolOverview, ToolDecisionMatrix, ToolComboPatterns } from './prompt-engineering/ToolOverview'
import { PromptCollection } from './prompt-engineering/PromptCollection'
// ci-cd
import { PipelineStages } from './ci-cd/PipelineStages'
import { YamlExplorer } from './ci-cd/YamlExplorer'
import { PatternCards } from './ci-cd/PatternCards'
import { GotchaAccordion } from './ci-cd/GotchaAccordion'
// auth
import { ConceptCards } from './auth/ConceptCards'
import { JwtParts } from './auth/JwtParts'
import { OAuthFlow } from './auth/OAuthFlow'
import { AuthPatterns } from './auth/AuthPatterns'
import { SecurityThreats } from './auth/SecurityThreats'
import { AuthQuiz } from './auth/AuthQuiz'
import { PkceFlow } from './auth/PkceFlow'
import { TokenLifecycle } from './auth/TokenLifecycle'
import { RbacPatterns } from './auth/RbacPatterns'
import { IntegrationFlow } from './auth/IntegrationFlow'
// kubernetes
import { K8sAnalogyCard } from './kubernetes/K8sAnalogyCard'
import { K8sConceptList } from './kubernetes/K8sConceptList'
import { K8sYamlExplorer } from './kubernetes/K8sYamlExplorer'
import { K8sFlowDiagram } from './kubernetes/K8sFlowDiagram'
// ai-infra
import { InfraLayerExplorer } from './ai-infra/InfraLayerExplorer'
import { WorkflowDetail } from './ai-infra/WorkflowDetail'
// nextjs-abstractions
import { ConceptDetail } from './nextjs-abstractions/ConceptDetail'
// git-worktrees
import { WorktreeDiagram } from './git-worktrees/WorktreeDiagram'
// security
import { SecurityTopicDetail } from './security/SecurityTopicDetail'
// tanstack-query
import { TsqCodeComparison } from './tanstack-query/TsqCodeComparison'
import { TsqComparisonTable } from './tanstack-query/TsqComparisonTable'
import { TsqCacheDemo } from './tanstack-query/TsqCacheDemo'
import { TsqQueryLifecycle } from './tanstack-query/TsqQueryLifecycle'
import { TsqStateDiagram } from './tanstack-query/TsqStateDiagram'
import { TsqProsCons } from './tanstack-query/TsqProsCons'
import { TsqWhyBoth } from './tanstack-query/TsqWhyBoth'

export const mdxComponents: MDXComponents = {
  pre: MdxPre,
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
  SectionTitle,
  SectionSubheading,
  SectionList,
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
  RoadmapSteps,
  GuideChecklist,
  StackExplorer,
  StackProsCons,
  DataFlowDiagram,
  LayerDiagram,
  FrameworkExplorer,
  FrameworkProsCons,
  TestingPyramid,
  TestTypeDetail,
  TestPracticeCards,
  TestToolsGrid,
  SeverityBadge,
  MistakeList,
  TechniqueDetail,
  CLIReference,
  TestingMistakes,
  ToolDetail,
  MetaTooling,
  CodingToolExplorer,
  ToolOverview,
  ToolDecisionMatrix,
  ToolComboPatterns,
  PromptCollection,
  PipelineStages,
  YamlExplorer,
  PatternCards,
  GotchaAccordion,
  ConceptCards,
  JwtParts,
  OAuthFlow,
  AuthPatterns,
  SecurityThreats,
  AuthQuiz,
  PkceFlow,
  TokenLifecycle,
  RbacPatterns,
  IntegrationFlow,
  K8sAnalogyCard,
  K8sConceptList,
  K8sYamlExplorer,
  K8sFlowDiagram,
  InfraLayerExplorer,
  WorkflowDetail,
  ConceptDetail,
  WorktreeDiagram,
  GuideStartContent,
  CodeAccordion,
  DefinitionTable,
  DefRow,
  SecurityTopicDetail,
  TsqCodeComparison,
  TsqComparisonTable,
  TsqCacheDemo,
  TsqQueryLifecycle,
  TsqStateDiagram,
  TsqProsCons,
  TsqWhyBoth,
}
