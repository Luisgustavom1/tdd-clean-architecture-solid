import React from 'react'
import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react"
import SignUp from "./signup"
import { Helper } from '@/presentation/test'
import ValidationStub from '@/presentation/test/mock-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const simulateValidSubmit = async (sut: RenderResult, 
  email = faker.internet.email(),
  name = faker.word.noun(),
  password = faker.internet.password()) => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId('submit-form') as HTMLButtonElement
  fireEvent.submit(form)
  await waitFor(() => form)
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <SignUp validation={validationStub} />
  )

  return { sut }
}

describe('<SignUp />', () => {
  it('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'status-wrap', 0)

    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)

    const submitForm = sut.getByTestId('submit-form') as HTMLButtonElement
    expect(submitForm.disabled).toBe(true)
  })

  it('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  it('Should show valid name state if Validation success', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  it('Should show valid email state if Validation success', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('Should show valid password state if Validation success', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('Should show valid passwordConfirmation state if Validation success', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  it('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    const submitButton = sut.getByTestId('submit-form') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', async () => {
    const {sut} = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })
})
