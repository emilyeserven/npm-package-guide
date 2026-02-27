import { QuizBase } from '../QuizBase'
import { GO_QUIZ_QUESTIONS } from '../../../data/goLangData'

export function GoQuiz() {
  return (
    <QuizBase
      questions={GO_QUIZ_QUESTIONS}
      accent="#0891b2"
      darkAccent="#22d3ee"
      perfectMessage="You nailed it! You already have great instincts for when to reach for Go."
      solidMessage="Solid understanding! You\u2019re picking up the differences quickly."
      retryMessage="Review the comparison table above and try again \u2014 the distinctions will click."
    />
  )
}
