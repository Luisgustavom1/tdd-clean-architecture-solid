import React from 'react'
import faker from '@faker-js/faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react'
import Login from './login'
import ValidationStub from '@/presentation/test/mock-validation'
import AuthenticationSpy from '@/presentation/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors'

import 'jest-localstorage-mock'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(
        <Router history={history}>
            <Login validation={validationStub} authentication={authenticationSpy} />
        </Router>
    )

    return { sut, authenticationSpy }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    populatePasswordField(sut, password)
    populateEmailField(sut, email)
    const form = sut.getByTestId('form');
    fireEvent.submit(form)
    await waitFor(() => form)
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

const testErrorWrapChildCount = (sut: RenderResult, count: number) => {
    const errorWrap = sut.getByTestId('status-wrap')
    expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string) => {
    const element = sut.getByTestId(fieldName)
    expect(element).toBeTruthy()
}

describe('<Login />', () => {
    afterEach(cleanup)
    beforeEach(() => {
        localStorage.clear()
    })

    it('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        testErrorWrapChildCount(sut, 0)

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

    it('Should show spinner on submit', async () => {
        const { sut } = makeSut();
        await simulateValidSubmit(sut)
        testElementExists(sut, 'spinner')
    })

    it('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut();
        const email = faker.internet.email()
        const password = faker.internet.password()
        await simulateValidSubmit(sut, email, password);
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })

    it('Should call Authentication only once', async () => {
        const { authenticationSpy, sut } = makeSut();
        await simulateValidSubmit(sut);
        await simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(1)
    })

    it('Should not call Authentication it form is invalid', async () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({ validationError })
        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(0)
    })

    it('Should present error if Authentication fails', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        await simulateValidSubmit(sut)
        const mainError = await sut.findByTestId('main-error')
        expect(mainError?.textContent).toBe(error.message)
        expect(sut.queryByTestId('spinner')).toBeNull()
    })

    it('Should add accessToken to localstorage on success', async () => {
        const { sut, authenticationSpy } = makeSut()
        await simulateValidSubmit(sut)
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    it('Should got ot signup page', async () => {
        const { sut } = makeSut()
        const buttonRegister = sut.getByRole('button', { name: 'Criar conta' })
        fireEvent.click(buttonRegister)
        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
    })
})