import { LoadSurveyResult } from '@/domain/usecases'
import { useEffect, useState } from 'react'

interface ISurveyResult {
  data: LoadSurveyResult.Model | null
  isLoading: boolean
  error: string
}

export function useSurveyResult (loadSurveyResult: LoadSurveyResult) {
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

  useEffect(() => {
    updateSurveyResult({
      isLoading: true
    })
    loadSurveyResult.load().then((newSurveyResult) => updateSurveyResult({
      data: newSurveyResult
    })).catch((error) => updateSurveyResult({
      error: error.message,
      data: null
    })).finally(() => updateSurveyResult({
      isLoading: false
    }))
  }, [])

  return surveyResult
}
