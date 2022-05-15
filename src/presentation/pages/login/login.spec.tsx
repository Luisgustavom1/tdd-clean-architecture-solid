import React from 'react'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'
import Login from './login'
import faker from '@faker-js/faker'
import ValidationStub from '@/presentation/test/mock-validation'

type SutTypes = {
    sut: RenderResult
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} />)

    return { sut }
}

describe('<Login />', () => {
    afterEach(cleanup)

    it('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        const errorWrap = sut.getByTestId('status-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const emailError = sut.getByTestId('email-error')
        expect(emailError.textContent).toBe(validationError)

        const passwordError = sut.getByTestId('password-error')
        expect(passwordError.textContent).toBe(validationError)

        const submitForm = sut.getByTestId('submit-form') as HTMLButtonElement
        expect(submitForm.disabled).toBe(true)
    })

    it('Should show email error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailError = sut.getByTestId('email-error')
        expect(emailError.textContent).toBe(validationError)
    })

    it('Should show password error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordError = sut.getByTestId('password-error')
        expect(passwordError.textContent).toBe(validationError)
    })

    it('Should show valid email state if Validation success', () => {
        const { sut } = makeSut();
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailError = sut.getByTestId('email-error')
        expect(emailError.textContent).toBe('')
    })

    it('Should show valid password state if Validation success', () => {
        const { sut } = makeSut();
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordError = sut.getByTestId('password-error')
        expect(passwordError.textContent).toBe('')
    })

    it('Should enable submit button if form is valid', () => {
        const { sut } = makeSut();
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const submitButton = sut.getByTestId('submit-form') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })

    it('Should show spinner on submit', () => {
        const { sut } = makeSut();
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const submitButton = sut.getByTestId('submit-form')
        fireEvent.click(submitButton)
        const spinnerElement = sut.getByTestId('spinner')
        expect(spinnerElement).toBeTruthy()
    })
})