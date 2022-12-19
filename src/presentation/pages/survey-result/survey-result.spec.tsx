import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyResult } from '@/presentation/pages/survey-result/survey-result'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/domain/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()) => {
  const history = createMemoryHistory({ initialEntries: ['/', '/surveys/any_id'], initialIndex: 1 })
  const setCurrentAccount = jest.fn()
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount,
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <Router history={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy,
    setCurrentAccount,
    history
  }
}

describe('<SurveyResult />', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut({ load: jest.fn().mockResolvedValueOnce(null) } as unknown as LoadSurveyResultSpy)
    const surveyList = screen.getByTestId('survey-result')
    expect(surveyList.childElementCount).toBe(0)
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
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2022-01-10T00:00:00')
    })
    loadSurveyResultSpy.surveyResult = surveyResult
    await act(() => {
      makeSut(loadSurveyResultSpy)
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

  it('Should render render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut(loadSurveyResultSpy)
    expect((await screen.findByTestId('error')).textContent).toBe(
      error.message
    )
    expect(screen.queryByTestId('loading')).toBeNull()
    expect(screen.queryByTestId('question')).toBeNull()
  })

  it('Should logout on accessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyResultSpy()
    jest
      .spyOn(loadSurveyListSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccount, history } = makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(setCurrentAccount).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should call loadSurveyResult on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyResultSpy()
    jest
      .spyOn(loadSurveyListSpy, 'load')
      .mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByTestId('survey-result-container'))
    fireEvent.click(
      await screen.findByRole('button', { name: /tentar novamente/i })
    )
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('survey-result-container'))
  })

  it.only('Should goto SurveyList on back button click', async () => {
    const { history } = makeSut()
    fireEvent.click(await screen.findByTestId('back-button'))
    expect(history.location.pathname).toBe('/')
  })
})
