import { mockSurveyModel } from '@/domain/test'
import { render, screen } from '@testing-library/react'
import { SurveyItem } from '.'
import React from 'react'
import { IconName } from '@/presentation/components/icon'

const makeSut = (survey = mockSurveyModel()) => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem component', () => {
  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question').textContent).toBe(survey.question)
  })

  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    )
    expect(screen.getByTestId('question').textContent).toBe(survey.question)
  })
})
