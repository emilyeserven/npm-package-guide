import { AUTH_QUIZ_QUESTIONS } from '../../../data/authData'
import { QuizBase } from '../QuizBase'

export function AuthQuiz() {
  return (
    <QuizBase
      questions={AUTH_QUIZ_QUESTIONS}
      accent="#6366f1"
      darkAccent="#6366f1"
      perfectMessage="Perfect! You're ready to implement auth confidently."
      solidMessage="Solid foundation! Review the sections you missed."
      retryMessage="Worth reviewing the guide again — you'll nail it next time!"
    />
  )
}
