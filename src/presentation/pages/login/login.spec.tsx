import React from 'react'
import faker from '@faker-js/faker'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'
import Login from './login'
import ValidationStub from '@/presentation/test/mock-validation'
import AuthenticationSpy from '@/presentation/test/mock-authentication'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)

    return { sut, authenticationSpy }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()) => {
    populatePasswordField(sut, password)
    populateEmailField(sut, email)
    const submitButton = sut.getByTestId('submit-form')
    fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()) => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()) => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateErrorForField = (sut: RenderResult, fieldName: string, validationError?: string) => {
    const emailError = sut.getByTestId(`${fieldName}-error`)
    expect(emailError.textContent).toBe(validationError || '')
}

describe('<Login />', () => {
    afterEach(cleanup)

    it('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        const errorWrap = sut.getByTestId('status-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        simulateErrorForField(sut, 'email', validationError)
        simulateErrorForField(sut, 'password', validationError)

        const submitForm = sut.getByTestId('submit-form') as HTMLButtonElement
        expect(submitForm.disabled).toBe(true)
    })

    it('Should show email error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        simulateErrorForField(sut, 'email', validationError)
    })

    it('Should show password error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populatePasswordField(sut)
        simulateErrorForField(sut, 'password', validationError)
    })

    it('Should show valid email state if Validation success', () => {
        const { sut } = makeSut();
        populateEmailField(sut)
        simulateErrorForField(sut, 'email')
    })

    it('Should show valid password state if Validation success', () => {
        const { sut } = makeSut();
        populatePasswordField(sut)
        simulateErrorForField(sut, 'password')
    })

    it('Should enable submit button if form is valid', () => {
        const { sut } = makeSut();
        populatePasswordField(sut)
        populateEmailField(sut)
        const submitButton = sut.getByTestId('submit-form') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })

    it('Should show spinner on submit', () => {
        const { sut } = makeSut();
        simulateValidSubmit(sut)
        const spinnerElement = sut.getByTestId('spinner')
        expect(spinnerElement).toBeTruthy()
    })

    it('Should call Authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut();
        const email = faker.internet.email()
        const password = faker.internet.password()
        simulateValidSubmit(sut, email, password);
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })
})