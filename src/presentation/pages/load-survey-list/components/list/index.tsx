import React from 'react'
import { SurveyItemEmpty } from '@/presentation/pages/load-survey-list/components/item-empty'
import { SurveyItem } from '@/presentation/pages/load-survey-list/components/item'
import { LoadSurveyList } from '@/domain/usecases'

interface ISuveryListProps {
  surveys: LoadSurveyList.Model[]
}

export const SurveyItemList = ({ surveys }: ISuveryListProps) => {
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
