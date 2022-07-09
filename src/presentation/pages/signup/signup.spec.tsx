import React from 'react'
import { render, RenderResult } from "@testing-library/react"
import SignUp from "./signup"
import { Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  )

  return { sut }
}

describe('<SignUp />', () => {
  it('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()

    Helper.testChildCount(sut, 'status-wrap', 0)

    Helper.simulateErrorForField(sut, 'email', validationError)
    Helper.simulateErrorForField(sut, 'password', validationError)

    const submitForm = sut.getByTestId('submit-form') as HTMLButtonElement
    expect(submitForm.disabled).toBe(true)
  })
})
