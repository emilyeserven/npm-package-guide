import { KC_QUIZ_QUESTIONS } from '../../../data/keycloakData'
import { QuizBase } from '../QuizBase'

export function KcQuiz() {
  return (
    <QuizBase
      questions={KC_QUIZ_QUESTIONS}
      accent="#f59e0b"
      darkAccent="#f59e0b"
      perfectMessage="Perfect! You're ready to integrate Keycloak into your React apps."
      solidMessage="Solid understanding! Review the sections you missed."
      retryMessage="Worth reviewing the guide again — you'll nail it next time!"
    />
  )
}
