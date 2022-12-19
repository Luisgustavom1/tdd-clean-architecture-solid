import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import { SurveyResult } from '@/presentation/pages/survey-result/survey-result'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/domain/test'

const makeSut = (surveyResult = mockSurveyResultModel()) => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  loadSurveyResultSpy.surveyResult = surveyResult
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
    await waitFor(() => surveyList)
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

  it('Should preset SurveyResult data on success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2022-01-10T00:00:00')
    })
    await act(() => {
      makeSut(surveyResult)
    })
    expect(screen.getByTestId('day').textContent).toBe('10')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year').textContent).toBe('2022')
    expect(screen.getByTestId('question').textContent).toBe(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(surveyResult.answers.length)
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    expect(answersWrap[0].getAttribute('class')).toBe('active')
    expect(answersWrap[1].getAttribute('class')).toBeFalsy()
    const images = screen.queryAllByTestId('image')
    expect(images[0].getAttribute('src')).toBe(surveyResult.answers[0].image)
    expect(images[0].getAttribute('alt')).toBe(surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0].textContent).toBe(surveyResult.answers[0].answer)
    expect(answers[1].textContent).toBe(surveyResult.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')
    expect(percents[0].textContent).toBe(`${surveyResult.answers[0].percent}%`)
    expect(percents[1].textContent).toBe(`${surveyResult.answers[1].percent}%`)
  })
})
