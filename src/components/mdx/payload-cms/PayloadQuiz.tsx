import { PAYLOAD_QUIZ_QUESTIONS } from '../../../data/payloadData'
import { QuizBase } from '../QuizBase'

export function PayloadQuiz() {
  return (
    <QuizBase
      questions={PAYLOAD_QUIZ_QUESTIONS}
      accent="#f97316"
      darkAccent="#fb923c"
      perfectMessage="Perfect! You understand Payload CMS inside and out."
      solidMessage="Solid understanding! Review the sections you missed."
      retryMessage="Worth reviewing the guide again — you'll nail it next time!"
    />
  )
}
