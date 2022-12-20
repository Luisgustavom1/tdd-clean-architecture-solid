import React from 'react'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Styles from './survey-result-styles.scss'
import { Loading } from '@/presentation/components/loading'
import { useSurveyResult } from '@/presentation/hooks/use-survey-result'
import { Error } from '@/presentation/components/error'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultData } from './components'

interface ISurveyResultProps {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResult = ({ loadSurveyResult }: ISurveyResultProps) => {
  const { data, error, isLoading, reload } = useSurveyResult(loadSurveyResult)
  console.log(data)
  return (
    <div data-testid='survey-result-container' className={Styles.surveyResultWrap}>
      <Header />

      <section data-testid='survey-result' className={Styles.contentWrap}>
       {data && <SurveyResultData surveyResult={data}/>}
      </section>
      {isLoading && <Loading />}
      {error && <Error error={error} reload={reload} />}

      <Footer />
    </div>
  )
}
