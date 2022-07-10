import React from 'react'
import { fireEvent, render, RenderResult } from "@testing-library/react"
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

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params.validationError
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
    Helper.testStatusForField(sut, 'email', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')

    const submitForm = sut.getByTestId('submit-form') as HTMLButtonElement
    expect(submitForm.disabled).toBe(true)
  })

  it('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})
