import React from 'react'
import { useHistory } from 'react-router-dom'
import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components/calendar'
import Button from '@/presentation/components/button'
import Styles from './result.styles.scss'
import { SurveyResultAnswer } from '..'

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
      <div data-testid='answers' className={Styles.answersList}>
        {surveyResult.answers.map((answer) => (
           <SurveyResultAnswer key={answer.answer} answer={answer} />
        ))}
      </div>
      <Button variant='filled' data-testid='back-button' onClick={goBack}>Voltar</Button>
    </>
  )
}

export default Result
