import React from 'react'
import { faker } from '@faker-js/faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import Login from '.'
import { InvalidCredentialsError } from '@/domain/errors'
import { Helper, ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { act } from 'react-dom/test-utils'
import { ApiContext } from '@/presentation/contexts'
import { Authentication } from '@/domain/usecases'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: jest.fn()
      }}
    >
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return { authenticationSpy, setCurrentAccountMock }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('password', password)
  Helper.populateField('email', email)
  const form = screen.getByTestId('form')
  await act(async () => {
    fireEvent.submit(form)
  })
  await waitFor(() => form)
}

describe('<Login />', () => {
  it('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.testChildCount('status-wrap', 0)

    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)

    const submitForm = screen.getByTestId('submit-form')
    expect(submitForm.disabled).toBe(true)
  })

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  it('Should show valid email state if Validation success', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('Should show valid password state if Validation success', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('password')
    Helper.populateField('email')
    const submitButton = screen.getByTestId('submit-form')
    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  it('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('Should not call Authentication it form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    Helper.testElementText('main-error', error.message)
    Helper.testChildCount('status-wrap', 1)
  })

  it('Should call SaveAcessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    )
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('Should go to signup page', async () => {
    makeSut()
    const buttonRegister = screen.getByRole('button', { name: 'Criar conta' })
    fireEvent.click(buttonRegister)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
