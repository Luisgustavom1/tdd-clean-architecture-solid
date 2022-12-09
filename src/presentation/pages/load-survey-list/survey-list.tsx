import React, { useEffect, useState } from 'react'
import { LoadSurveyList } from '@/domain/usecases'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import { useErrorHandler } from '@/presentation/hooks'
import { Error } from '@/presentation/components/error'
import { SurveyItemList } from './components/list'
import { SurveyContext } from './context'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error) => setError(error.message))
  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>([])
  const [error, setError] = useState('')
  const [reload, setReload] = useState(false)

  const onReload = () => {
    setError('')
    setReload(!reload)
  }

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setSurveys(surveys)
      })
      .catch((error) => handleError(error))
  }, [reload])
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider
          value={{ surveys, error, setError, reload, setReload }}
        >
          {error ? <Error error={error} reload={onReload} /> : <SurveyItemList />}
        </SurveyContext.Provider>
      </div>

      <Footer />
    </div>
  )
}
export default SurveyList
