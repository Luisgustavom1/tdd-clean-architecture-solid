import React from 'react'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Styles from './survey-result-styles.scss'
import { Loading } from '@/presentation/components/loading'
import { useSurveyResult } from '@/presentation/hooks/use-survey-result'
import { Error } from '@/presentation/components/error'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { SurveyResultContext, SurveyResultData } from './components'

interface ISurveyResultProps {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

export const SurveyResult = ({ loadSurveyResult, saveSurveyResult }: ISurveyResultProps) => {
  const { data, error, isLoading, reload, saveAnswer } = useSurveyResult(loadSurveyResult, saveSurveyResult)

  const onAnswer = (answer: string) => {
    if (isLoading) return
    saveAnswer(answer)
  }

  return (
    <div data-testid='survey-result-container' className={Styles.surveyResultWrap}>
      <Header />

      <SurveyResultContext.Provider value={{ onAnswer }}>
        <section data-testid='survey-result' className={Styles.contentWrap}>
        {data && <SurveyResultData surveyResult={data}/>}
        </section>
      </SurveyResultContext.Provider>
      {isLoading && <Loading />}
      {error && <Error error={error} reload={reload} />}

      <Footer />
    </div>
  )
}
