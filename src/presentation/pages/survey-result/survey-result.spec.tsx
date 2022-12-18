import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyResult } from '@/presentation/pages/survey-result/survey-result'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

const makeSut = () => {
  const setCurrentAccount = jest.fn()
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount,
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <SurveyResult />
    </ApiContext.Provider>
  )
}

describe('<SurveyResult />', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-result')
    expect(surveyList.childElementCount).toBe(0)
    expect(screen.queryByTestId('loading')).toBeNull()
    expect(screen.queryByTestId('error')).toBeNull()
  })
})
