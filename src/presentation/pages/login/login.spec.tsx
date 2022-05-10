import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './login'

type SutTypes = {
    sut: RenderResult
}

const makeSut = (): SutTypes => {
    const sut = render(<Login />)

    return { sut }
}

describe('<Login />', () => {
    it('', () => {
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
})