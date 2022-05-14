import React from 'react'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'
import Login from './login'
import faker from '@faker-js/faker'
import ValidationStub from '@/presentation/test/mock-validation'

type SutTypes = {
    sut: RenderResult
    validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = faker.random.words()
    const sut = render(<Login validation={validationStub} />)

    return { sut, validationStub }
}

describe('<Login />', () => {
    afterEach(cleanup)

    it('Should start with initial state', () => {
        const { sut, validationStub } = makeSut()

        const errorWrap = sut.getByTestId('status-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const emailError = sut.getByTestId('email-error')
        expect(emailError.textContent).toBe(validationStub.errorMessage)

        const passwordError = sut.getByTestId('password-error')
        expect(passwordError.textContent).toBe(validationStub.errorMessage)

        const submitForm = sut.getByTestId('submit-form') as HTMLButtonElement
        expect(submitForm.disabled).toBe(true)
    })

    it('Should show email error if Validation fails', () => {
        const { sut, validationStub } = makeSut();
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailError = sut.getByTestId('email-error')
        expect(emailError.textContent).toBe(validationStub.errorMessage)
    })

    it('Should show password error if Validation fails', () => {
        const { sut, validationStub } = makeSut();
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordError = sut.getByTestId('password-error')
        expect(passwordError.textContent).toBe(validationStub.errorMessage)
    })
})