import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyResult } from '@/presentation/pages/survey-result/survey-result'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel, SaveSurveyResultSpy } from '@/domain/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

interface MakeSutParams {
  loadSurveyResultSpy?: LoadSurveyResultSpy
  saveSurveyResultSpy?: SaveSurveyResultSpy
}

const makeSut = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy()
}: MakeSutParams = {}) => {
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
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} saveSurveyResult={saveSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy,
    saveSurveyResultSpy,
    setCurrentAccount,
    history
  }
}

describe('<SurveyResult />', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut()
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
      makeSut({ loadSurveyResultSpy })
    })
    expect(screen.getByTestId('day').textContent).toBe('10')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year').textContent).toBe('2022')
    expect(screen.getByTestId('question').textContent).toBe(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(surveyResult.answers.length)
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    expect(answersWrap[0].getAttribute('class').includes('active')).toBeTruthy()
    expect(answersWrap[1].getAttribute('class').includes('active')).toBeFalsy()
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
    makeSut({ loadSurveyResultSpy })
    expect((await screen.findByTestId('error')).textContent).toBe(
      error.message
    )
    expect(screen.queryByTestId('loading')).toBeNull()
    expect(screen.queryByTestId('question')).toBeNull()
  })

  it('Should logout on accessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccount, history } = makeSut({ loadSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(setCurrentAccount).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should call loadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new UnexpectedError())
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result-container'))
    fireEvent.click(
      await screen.findByRole('button', { name: /tentar novamente/i })
    )
    expect(loadSurveyResultSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('survey-result-container'))
  })

  it('Should goto SurveyList on back button click', async () => {
    const { history } = makeSut()
    fireEvent.click(await screen.findByTestId('back-button'))
    expect(history.location.pathname).toBe('/')
  })

  it('Should not present loading on active answer click', async () => {
    await act(() => {
      makeSut()
    })
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[0])
    expect(screen.queryByTestId('loading')).toBeNull()
  })

  it('Should call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = await act(() => {
      return makeSut()
    })
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    await waitFor(() => fireEvent.click(answersWrap[1]))
    expect(screen.getByTestId('loading')).toBeTruthy()
    expect(saveSurveyResultSpy.params).toEqual({
      answer: loadSurveyResultSpy.surveyResult.answers[1].answer
    })
  })

  it('Should render render error on UnexpectedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
    await act(() => {
      return makeSut({ saveSurveyResultSpy })
    })
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    await waitFor(() => fireEvent.click(answersWrap[1]))
    expect((await screen.findByTestId('error')).textContent).toBe(
      error.message
    )
    expect(screen.queryByTestId('loading')).toBeNull()
    expect(screen.queryByTestId('question')).toBeNull()
  })

  it('Should logout on AccessDeniedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const error = new AccessDeniedError()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
    const { history, setCurrentAccount } = await act(() => {
      return makeSut({ saveSurveyResultSpy })
    })
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    await waitFor(() => fireEvent.click(answersWrap[1]))
    expect(setCurrentAccount).toBeCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should preset SaveSurveyResult data on success', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2018-02-20T00:00:00')
    })
    saveSurveyResultSpy.surveyResult = surveyResult
    await act(() => {
      makeSut({ saveSurveyResultSpy })
    })
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])
    await act(async () => {
      screen.getByTestId('survey-result')
    })
    expect(screen.getByTestId('day').textContent).toBe('20')
    expect(screen.getByTestId('month').textContent).toBe('fev')
    expect(screen.getByTestId('year').textContent).toBe('2018')
    expect(screen.getByTestId('question').textContent).toBe(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(surveyResult.answers.length)
    expect(answersWrap[0].getAttribute('class').includes('active')).toBeTruthy()
    expect(answersWrap[1].getAttribute('class').includes('active')).toBeFalsy()
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
    expect(screen.queryByTestId('loading')).toBeNull()
  })

  it('Should preset SaveSurveyResult data on success', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    await act(() => {
      makeSut({ saveSurveyResultSpy })
    })
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])
    fireEvent.click(answersWrap[1])
    await act(async () => {
      screen.getByTestId('survey-result')
    })
    expect(saveSurveyResultSpy.callsCount).toBe(1)
  })
})
