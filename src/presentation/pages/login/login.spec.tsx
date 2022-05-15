import React from 'react'
import faker from '@faker-js/faker'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'
import Login from './login'
import ValidationStub from '@/presentation/test/mock-validation'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/model'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
    account = mockAccountModel()
    params: AuthenticationParams

    auth(params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        return Promise.resolve(this.account)
    }

}

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

    it('Should call Authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut();
        const passwordInput = sut.getByTestId('password')
        const email = faker.internet.email();
        const password = faker.internet.password()
        fireEvent.input(passwordInput, { target: { value: password } })
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: email } })
        const submitButton = sut.getByTestId('submit-form')
        fireEvent.click(submitButton)
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })
})