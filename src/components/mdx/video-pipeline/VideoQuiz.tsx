import { QuizBase } from '../QuizBase'
import { VP_QUIZ_QUESTIONS } from '../../../data/videoPipelineData'

export function VideoQuiz() {
  return (
    <QuizBase
      questions={VP_QUIZ_QUESTIONS}
      accent="#059669"
      darkAccent="#2dd4bf"
      perfectMessage="Perfect — you've nailed the video pipeline!"
      solidMessage="Solid understanding of the fundamentals!"
      retryMessage="Review the sections above and try again!"
    />
  )
}
