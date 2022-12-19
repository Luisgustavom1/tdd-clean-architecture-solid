import React from 'react'
import { useHistory } from 'react-router-dom'
import FlipMove from 'react-flip-move'
import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components/calendar'
import Button from '@/presentation/components/button'
import Styles from './result.styles.scss'

interface IResultProps {
  surveyResult: LoadSurveyResult.Model
}

const Result = ({ surveyResult }: IResultProps) => {
  const { goBack } = useHistory()

  return (
    <>
      <hgroup className={Styles.titleContainer}>
        <Calendar className={Styles.calendarWrap} date={surveyResult.date} />
        <h2 data-testid='question'>{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid='answers' className={Styles.answersList}>
        {
          surveyResult.answers.map((answer) => (
            <li data-testid='answer-wrap' className={answer.isCurrentAccountAnswer ? Styles.active : ''} key={answer.answer}>
              {answer.image && <img data-testid='image' alt={answer.answer} src={answer.image} />}
              <span data-testid='answer' className={Styles.answer}>{answer.answer}</span>
              <span data-testid='percent' className={Styles.percent}>{answer.percent}%</span>
            </li>
          ))
        }
      </FlipMove>
      <Button variant='filled' data-testid='back-button' onClick={goBack}>Voltar</Button>
    </>
  )
}

export default Result
