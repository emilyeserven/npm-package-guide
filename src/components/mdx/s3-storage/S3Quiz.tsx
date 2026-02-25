import { S3_QUIZ_QUESTIONS } from '../../../data/s3Data'
import { QuizBase } from '../QuizBase'

export function S3Quiz() {
  return (
    <QuizBase
      questions={S3_QUIZ_QUESTIONS}
      accent="#d97706"
      darkAccent="#f0a840"
      perfectMessage="Perfect! You know S3 better than most backend engineers."
      solidMessage="Solid understanding! Review the sections you missed."
      retryMessage="Worth reviewing the guide again \u2014 you'll nail it next time!"
    />
  )
}
