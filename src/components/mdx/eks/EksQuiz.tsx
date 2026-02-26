import { QuizBase } from '../QuizBase'
import {
  EKS_OVERVIEW_QUIZ,
  EKS_KUBERNETES_QUIZ,
  EKS_ARCHITECTURE_QUIZ,
  EKS_NETWORKING_QUIZ,
  EKS_DEPLOYMENTS_QUIZ,
  EKS_SECURITY_QUIZ,
} from '../../../data/eksData'
import type { QuizQuestion } from '../QuizBase'

const quizMap: Record<string, QuizQuestion[]> = {
  overview: EKS_OVERVIEW_QUIZ,
  kubernetes: EKS_KUBERNETES_QUIZ,
  architecture: EKS_ARCHITECTURE_QUIZ,
  networking: EKS_NETWORKING_QUIZ,
  deployments: EKS_DEPLOYMENTS_QUIZ,
  security: EKS_SECURITY_QUIZ,
}

export function EksQuiz({ quizId }: { quizId: string }) {
  const questions = quizMap[quizId]
  if (!questions) return null

  return (
    <QuizBase
      questions={questions}
      accent="#c2410c"
      darkAccent="#FF6B35"
      perfectMessage="Perfect! You've nailed this section."
      solidMessage="Solid understanding! Review the sections you missed."
      retryMessage="Worth reviewing this section again — you'll get it next time!"
    />
  )
}
