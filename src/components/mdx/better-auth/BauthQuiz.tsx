import { BAUTH_QUIZ_QUESTIONS } from '../../../data/betterAuthData'
import { QuizBase } from '../QuizBase'

export function BauthQuiz() {
  return (
    <QuizBase
      questions={BAUTH_QUIZ_QUESTIONS}
      accent="#db2777"
      darkAccent="#e879a0"
      perfectMessage="Perfect! You're ready to implement BetterAuth with confidence."
      solidMessage="Solid understanding! Review the sections you missed."
      retryMessage="Worth reviewing the guide again — you'll nail it next time!"
    />
  )
}
