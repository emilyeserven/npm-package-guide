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
// state-management
import { StateDeepDive } from './state-management/StateDeepDive'
import { StateComparison } from './state-management/StateComparison'
import { StateDecisionTree } from './state-management/StateDecisionTree'
import { StateArchitecture } from './state-management/StateArchitecture'
// tanstack-query
import { TsqCodeComparison } from './tanstack-query/TsqCodeComparison'
import { TsqComparisonTable } from './tanstack-query/TsqComparisonTable'
import { TsqCacheDemo } from './tanstack-query/TsqCacheDemo'
import { TsqQueryLifecycle } from './tanstack-query/TsqQueryLifecycle'
import { TsqStateDiagram } from './tanstack-query/TsqStateDiagram'
import { TsqProsCons } from './tanstack-query/TsqProsCons'
import { TsqWhyBoth } from './tanstack-query/TsqWhyBoth'
// tanstack-router
import { TsrTopicDetail } from './tanstack-router/TsrTopicDetail'
// aws-decoded
import { AwsServiceExplorer } from './aws-decoded/AwsServiceExplorer'
// claude-skills
import { SkillTierCards } from './claude-skills/SkillTierCards'
import { SkillScenarioCards } from './claude-skills/SkillScenarioCards'
import { SkillFileBrowser } from './claude-skills/SkillFileBrowser'
import { SkillDescriptionDemo } from './claude-skills/SkillDescriptionDemo'
import { SkillWritingTips } from './claude-skills/SkillWritingTips'
import { SkillResourceCards } from './claude-skills/SkillResourceCards'
import { SkillDos, SkillDonts } from './claude-skills/SkillDosDonts'
import { SkillChecklist } from './claude-skills/SkillChecklist'
// zustand
import { ZstCodeBlock, ZstCodeGroup, ZstApiRef } from './zustand/ZstCodeBlock'
import { ZstCounter, ZstTodo, ZstRerenderViz, ZstStats, ZstSlicesCompare } from './zustand/ZstDemos'
// pwa
import { PwaTopicDetail } from './pwa/PwaTopicDetail'
import { PwaLifecycleDiagram } from './pwa/PwaLifecycleDiagram'
import { PwaCachingDiagram } from './pwa/PwaCachingDiagram'
// cowork
import { CoworkStepCards } from './cowork/CoworkStepCards'
import { CoworkComparisonTable } from './cowork/CoworkComparisonTable'
import { CoworkCapabilities } from './cowork/CoworkCapabilities'
import { CoworkPluginCards } from './cowork/CoworkPluginCards'
import { CoworkOverviewCards } from './cowork/CoworkOverviewCards'
// coolify-deploy
import { TrafficDiagram } from './coolify-deploy/TrafficDiagram'
import { FoundationAccordion } from './coolify-deploy/FoundationAccordion'
import { SpaRoutingDiagram } from './coolify-deploy/SpaRoutingDiagram'
import { CoolifyGotchaAccordion } from './coolify-deploy/CoolifyGotchaAccordion'
import { PiModelTable } from './coolify-deploy/PiModelTable'
import { PiPerformanceAccordion } from './coolify-deploy/PiPerformanceAccordion'
import { PiGotchaAccordion } from './coolify-deploy/PiGotchaAccordion'
// jscodeshift
import { JcsPipeline, JcsConceptCards, JcsAstDemo } from './jscodeshift/JcsConcepts'
import { JcsMethodTable, JcsCliFlagsTable, JcsNodeTypeTable, JcsBuilderTable, JcsAgentDecisionTable } from './jscodeshift/JcsTables'
import { JcsPlayground } from './jscodeshift/JcsPlayground'
import { JcsRecipeAccordion } from './jscodeshift/JcsRecipeAccordion'
import { JcsTestingChecklist, JcsRolloutTimeline, JcsPitfallAccordion, JcsEcosystemCards } from './jscodeshift/JcsWorkflow'
import { JcsAgentCards, JcsClaudeWorkflow } from './jscodeshift/JcsAgents'
// info-architecture
import { IaPillarCards } from './info-architecture/IaPillarCards'
import { IaSchemeExplorer } from './info-architecture/IaSchemeExplorer'
import { IaNavPatternCards } from './info-architecture/IaNavPatternCards'
import { IaPatternCards } from './info-architecture/IaPatternCards'
import { IaAiPrincipleCards } from './info-architecture/IaAiPrincipleCards'
// s3-storage
import { S3ConceptGrid } from './s3-storage/S3ConceptGrid'
import { StorageClassCards } from './s3-storage/StorageClassCards'
import { S3ComparisonTable } from './s3-storage/S3ComparisonTable'
import { S3LifecycleTimeline } from './s3-storage/S3LifecycleTimeline'
import { S3CostCalculator } from './s3-storage/S3CostCalculator'
import { S3ClassPicker } from './s3-storage/S3ClassPicker'
import { S3FrontendPatterns } from './s3-storage/S3FrontendPatterns'
import { S3Quiz } from './s3-storage/S3Quiz'
// shell-scripting
import { ShellQuiz } from './shell-scripting/ShellQuiz'
// nginx
import { NginxComparison } from './nginx/NginxComparison'
import { NginxEventLoopDiagram } from './nginx/NginxEventLoopDiagram'
import { NginxLocationDemo } from './nginx/NginxLocationDemo'
import { NginxLoadBalancingDemo } from './nginx/NginxLoadBalancingDemo'
import { NginxReverseProxyDiagram } from './nginx/NginxReverseProxyDiagram'
import { NginxEnterpriseDiagram } from './nginx/NginxEnterpriseDiagram'
import { NginxCommandList } from './nginx/NginxCommandList'

import { CmdPrinciples } from './claude-md/CmdPrinciples'
import { CmdAntiPatterns } from './claude-md/CmdAntiPatterns'
import { CmdCategories } from './claude-md/CmdCategories'
import { CmdLayouts } from './claude-md/CmdLayouts'
import { CmdFeatures } from './claude-md/CmdFeatures'
import { CmdHierarchyTable } from './claude-md/CmdHierarchyTable'
// tanstack-ai
import { TsaiCodeTabs } from './tanstack-ai/TsaiCodeTabs'
import { TsaiFeatureCards } from './tanstack-ai/TsaiFeatureCards'
import { TsaiPackageGrid } from './tanstack-ai/TsaiPackageGrid'
import { TsaiChatDemo } from './tanstack-ai/TsaiChatDemo'
import { TsaiApprovalDemo } from './tanstack-ai/TsaiApprovalDemo'
import { TsaiComparisonTable } from './tanstack-ai/TsaiComparisonTable'
// tanstack-start
import { TssFeatureCards } from './tanstack-start/TssFeatureCards'
import { TssArchitectureDiagram } from './tanstack-start/TssArchitectureDiagram'
import { TssFileTree } from './tanstack-start/TssFileTree'
import { TssCodeTabs } from './tanstack-start/TssCodeTabs'
import { TssComparisonView } from './tanstack-start/TssComparisonView'

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
  StateDeepDive,
  StateComparison,
  StateDecisionTree,
  StateArchitecture,
  TsqCodeComparison,
  TsqComparisonTable,
  TsqCacheDemo,
  TsqQueryLifecycle,
  TsqStateDiagram,
  TsqProsCons,
  TsqWhyBoth,
  TsrTopicDetail,
  JcsPipeline,
  JcsConceptCards,
  JcsAstDemo,
  JcsMethodTable,
  JcsCliFlagsTable,
  JcsNodeTypeTable,
  JcsBuilderTable,
  JcsAgentDecisionTable,
  JcsPlayground,
  JcsRecipeAccordion,
  JcsTestingChecklist,
  JcsRolloutTimeline,
  JcsPitfallAccordion,
  JcsEcosystemCards,
  JcsAgentCards,
  JcsClaudeWorkflow,
  S3ConceptGrid,
  StorageClassCards,
  S3ComparisonTable,
  S3LifecycleTimeline,
  S3CostCalculator,
  S3ClassPicker,
  S3FrontendPatterns,
  S3Quiz,
  AwsServiceExplorer,
  SkillTierCards,
  SkillScenarioCards,
  SkillFileBrowser,
  SkillDescriptionDemo,
  SkillWritingTips,
  SkillResourceCards,
  SkillDos,
  SkillDonts,
  SkillChecklist,
  ZstCodeBlock,
  ZstCodeGroup,
  ZstApiRef,
  ZstCounter,
  ZstTodo,
  ZstRerenderViz,
  ZstStats,
  ZstSlicesCompare,
  PwaTopicDetail,
  PwaLifecycleDiagram,
  PwaCachingDiagram,
  CoworkStepCards,
  CoworkComparisonTable,
  CoworkCapabilities,
  CoworkPluginCards,
  CoworkOverviewCards,
  TrafficDiagram,
  FoundationAccordion,
  SpaRoutingDiagram,
  CoolifyGotchaAccordion,
  PiModelTable,
  PiPerformanceAccordion,
  PiGotchaAccordion,
  IaPillarCards,
  IaSchemeExplorer,
  IaNavPatternCards,
  IaPatternCards,
  IaAiPrincipleCards,
  ShellQuiz,
  NginxComparison,
  NginxEventLoopDiagram,
  NginxLocationDemo,
  NginxLoadBalancingDemo,
  NginxReverseProxyDiagram,
  NginxEnterpriseDiagram,
  NginxCommandList,
  CmdPrinciples,
  CmdAntiPatterns,
  CmdCategories,
  CmdLayouts,
  CmdFeatures,
  CmdHierarchyTable,
  TsaiCodeTabs,
  TsaiFeatureCards,
  TsaiPackageGrid,
  TsaiChatDemo,
  TsaiApprovalDemo,
  TsaiComparisonTable,
  TssFeatureCards,
  TssArchitectureDiagram,
  TssFileTree,
  TssCodeTabs,
  TssComparisonView,
}
