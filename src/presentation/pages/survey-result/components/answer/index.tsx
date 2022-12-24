import React, { useContext } from 'react'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultContext } from '@/presentation/pages/survey-result/components'
import Styles from './answer.styles.scss'

interface IAnswerProps {
  answer: LoadSurveyResult.Model['answers'][0]
}

const Answer = ({ answer }: IAnswerProps) => {
  const { onAnswer } = useContext(SurveyResultContext)

  const answerClick = (event: React.MouseEvent) => {
    if (event.currentTarget.classList.contains(Styles.active)) {
      return
    }

    onAnswer(answer.answer)
  }
  return (
    <li
      onClick={answerClick}
      data-testid='answer-wrap'
      className={[answer.isCurrentAccountAnswer ? Styles.active : '', Styles.answerContainer].join(' ')}
    >
      {answer.image && <img data-testid='image' alt={answer.answer} src={answer.image} />}
      <span data-testid='answer' className={Styles.answer}>{answer.answer}</span>
      <span data-testid='percent' className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
