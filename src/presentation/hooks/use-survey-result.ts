import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useEffect, useState } from 'react'
import { useErrorHandler } from './use-error-handler'

interface ISurveyResult {
  data: LoadSurveyResult.Model | null
  isLoading: boolean
  error: string
}

export function useSurveyResult (loadSurveyResult: LoadSurveyResult, saveSurveyResult: SaveSurveyResult) {
  const handleError = useErrorHandler((error) => {
    updateSurveyResult({
      error: error.message,
      data: null
    })
  })
  const [surveyResult, setSurveyResult] = useState<ISurveyResult>({
    data: null as LoadSurveyResult.Model,
    isLoading: false,
    error: ''
  })

  function updateSurveyResult (updatedSurveyResult: Partial<ISurveyResult>) {
    setSurveyResult((prevState) => ({
      ...prevState,
      ...updatedSurveyResult
    }))
  }

  function getSurveyResult () {
    updateSurveyResult({
      isLoading: true
    })
    loadSurveyResult.load().then((newSurveyResult) => updateSurveyResult({
      data: newSurveyResult,
      error: null
    })).catch(handleError).finally(() => updateSurveyResult({
      isLoading: false
    }))
  }

  function saveAnswer (answer: string) {
    updateSurveyResult({
      isLoading: true
    })
    saveSurveyResult.save({ answer }).then((newSurveyResult) => updateSurveyResult({
      error: null
    })).catch(handleError).finally(() => updateSurveyResult({
      isLoading: false
    }))
  }

  useEffect(() => {
    getSurveyResult()
  }, [])

  return {
    ...surveyResult,
    reload: getSurveyResult,
    saveAnswer
  }
}
