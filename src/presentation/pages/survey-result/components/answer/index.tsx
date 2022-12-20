import React from 'react'
import { LoadSurveyResult } from '@/domain/usecases'
import Styles from './answer.styles.scss'

interface IAnswerProps {
  answer: LoadSurveyResult.Model['answers'][0]
}

const Answer = ({ answer }: IAnswerProps) => {
  return (
    <li
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
