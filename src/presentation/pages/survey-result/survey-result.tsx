import React, { useEffect } from 'react'
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
  const { surveys, error, isLoading } = useSurveyResult()

  useEffect(() => {
    loadSurveyResult.load().then().catch()
  })
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />

      <section data-testid='survey-result' className={Styles.contentWrap}>
       {
        surveys &&
          <>
            <hgroup className={Styles.titleContainer}>
              <Calendar className={Styles.calendarWrap} date={new Date()} />
              <h2>Qual é seu framework web favorito? Qual é seu framework web favorito? Qual é seu framework web favorito ito? Qual é seu framework web favorit ito? Qual é seu framework web favorit</h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
              <li>
                <img src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" />
                <span className={Styles.answer}>Rea ctJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" />
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" />
                <span className={Styles.answer}>ReactJs</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <Button variant='filled'>Voltar</Button>
            {isLoading && <Loading />}
            {error && <Error error={error} reload={() => ({})} />}
          </>
       }
      </section>

      <Footer />
    </div>
  )
}
