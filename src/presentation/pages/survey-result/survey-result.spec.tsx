import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyResult } from '@/presentation/pages/survey-result/survey-result'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/test'

const makeSut = () => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy
  }
}

describe('<SurveyResult />', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-result')
    expect(surveyList.childElementCount).toBe(0)
    expect(screen.queryByTestId('loading')).toBeNull()
    expect(screen.queryByTestId('error')).toBeNull()
  })

  it('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => {
      screen.getByTestId('survey-result')
    })
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
})
