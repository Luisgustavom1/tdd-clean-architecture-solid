import React from 'react'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'
import Login from './login'

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = render(<Login validation={validationSpy} />)

    return { sut, validationSpy }
}

describe('<Login />', () => {
    afterEach(cleanup)
    
    it('Should start with initial state', () => {
        const { sut } = makeSut()

        const errorWrap = sut.getByTestId('status-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const emailError = sut.getByTestId('email-error')
        expect(emailError.textContent).toBe('Email obrigatório')

        const passwordError = sut.getByTestId('password-error')
        expect(passwordError.textContent).toBe('Password obrigatório')

        const submitForm = sut.getByTestId('submit-form') as HTMLButtonElement
        expect(submitForm.disabled).toBe(true)
    })

    it('Should call Validation with correct email', () => {
        const { sut, validationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        expect(validationSpy.fieldName).toEqual('email')
        expect(validationSpy.fieldValue).toEqual('any_email')
    })

    it('Should call Validation with correct password', () => {
        const { sut, validationSpy } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        expect(validationSpy.fieldName).toEqual('password')
        expect(validationSpy.fieldValue).toEqual('any_password')
    })
})