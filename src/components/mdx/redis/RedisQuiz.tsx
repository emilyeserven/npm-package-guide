import { REDIS_QUIZ_QUESTIONS } from '../../../data/redisData'
import { QuizBase } from '../QuizBase'

export function RedisQuiz() {
  return (
    <QuizBase
      questions={REDIS_QUIZ_QUESTIONS}
      accent="#dc2626"
      darkAccent="#f87171"
      perfectMessage="Perfect score! You really know your Redis."
      solidMessage="Solid understanding! Review the sections you missed."
      retryMessage="Good start — revisit the guide sections above and try again."
    />
  )
}
