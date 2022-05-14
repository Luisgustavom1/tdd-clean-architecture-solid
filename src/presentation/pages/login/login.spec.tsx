import React from 'react'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'
import Login from './login'
import ValidationSpy from '@/presentation/test/mock-validation'
import faker from '@faker-js/faker'

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    validationSpy.errorMessage = faker.random.words()
    const sut = render(<Login validation={validationSpy} />)

    return { sut, validationSpy }
}

describe('<Login />', () => {
    afterEach(cleanup)

    it('Should start with initial state', () => {
        const { sut, validationSpy } = makeSut()

        const errorWrap = sut.getByTestId('status-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const emailError = sut.getByTestId('email-error')
        expect(emailError.textContent).toBe(validationSpy.errorMessage)

        const passwordError = sut.getByTestId('password-error')
        expect(passwordError.textContent).toBe(validationSpy.errorMessage)

        const submitForm = sut.getByTestId('submit-form') as HTMLButtonElement
        expect(submitForm.disabled).toBe(true)
    })

    it('Should call Validation with correct email', () => {
        const { sut, validationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        const email = faker.internet.email()
        fireEvent.input(emailInput, { target: { value: email } })
        expect(validationSpy.fieldName).toEqual('email')
        expect(validationSpy.fieldValue).toEqual(email)
    })

    it('Should call Validation with correct password', () => {
        const { sut, validationSpy } = makeSut()
        const passwordInput = sut.getByTestId('password')
        const password = faker.internet.password()
        fireEvent.input(passwordInput, { target: { value: password } })
        expect(validationSpy.fieldName).toEqual('password')
        expect(validationSpy.fieldValue).toEqual(password)
    })

    it('Should show email error if Validation fails', () => {
        const { sut, validationSpy } = makeSut();
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailError = sut.getByTestId('email-error')
        expect(emailError.textContent).toBe(validationSpy.errorMessage)
    })
})