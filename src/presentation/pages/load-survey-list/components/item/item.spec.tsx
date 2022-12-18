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
      didAnswer: true,
      date: new Date('2022-01-10T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('day').textContent).toBe('10')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year').textContent).toBe('2022')
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question').textContent).toBe(survey.question)
  })

  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2019-05-05T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('day').textContent).toBe('05')
    expect(screen.getByTestId('month').textContent).toBe('mai')
    expect(screen.getByTestId('year').textContent).toBe('2019')
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    )
    expect(screen.getByTestId('question').textContent).toBe(survey.question)
  })
})
