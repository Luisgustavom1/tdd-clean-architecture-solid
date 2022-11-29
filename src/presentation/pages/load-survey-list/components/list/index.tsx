import React, { useContext } from 'react'
import { SurveyContext } from '@/presentation/pages/load-survey-list/context'
import { SurveyItemEmpty } from '../item-empty'
import { SurveyItem } from '../item'

export const SurveyItemList = () => {
  const { surveys } = useContext(SurveyContext)
  return (
    <ul data-testid="survey-list">
      {surveys.length > 0
        ? (
            surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
          )
        : (
        <SurveyItemEmpty />
          )}
    </ul>
  )
}
