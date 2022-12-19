import React from 'react'
import FlipMove from 'react-flip-move'
import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Styles from './survey-result-styles.scss'
import { Loading } from '@/presentation/components/loading'
import { Calendar } from '@/presentation/components/calendar'
import { useSurveyResult } from '@/presentation/hooks/use-survey-resuult'
import { Error } from '@/presentation/components/error'
import { LoadSurveyResult } from '@/domain/usecases'

interface ISurveyResultProps {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResult = ({ loadSurveyResult }: ISurveyResultProps) => {
  const { data, error, isLoading } = useSurveyResult(loadSurveyResult)
  return (
    <div data-testid='survey-result-container' className={Styles.surveyResultWrap}>
      <Header />

      <section data-testid='survey-result' className={Styles.contentWrap}>
       {
        data &&
          <>
            <hgroup className={Styles.titleContainer}>
              <Calendar className={Styles.calendarWrap} date={data.date} />
              <h2 data-testid='question'>{data.question}</h2>
            </hgroup>
            <FlipMove data-testid='answers' className={Styles.answersList}>
              {
                data.answers.map((answer) => (
                  <li data-testid='answer-wrap' className={answer.isCurrentAccountAnswer ? Styles.active : ''} key={answer.answer}>
                    {answer.image && <img data-testid='image' alt={answer.answer} src={answer.image} />}
                    <span data-testid='answer' className={Styles.answer}>{answer.answer}</span>
                    <span data-testid='percent' className={Styles.percent}>{answer.percent}%</span>
                  </li>
                ))
              }
            </FlipMove>
            <Button variant='filled'>Voltar</Button>
          </>
       }
      </section>
      {isLoading && <Loading />}
      {error && <Error error={error} reload={async () => loadSurveyResult.load()} />}

      <Footer />
    </div>
  )
}
