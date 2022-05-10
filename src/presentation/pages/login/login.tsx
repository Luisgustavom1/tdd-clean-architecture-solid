import React, { useEffect } from 'react'

import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Input from '@/presentation/components/input'
import Spinner from '@/presentation/components/spinner'
import Context from '@/presentation/contexts/form/form-context';

import Styles from './login-style.scss'
import { Validation } from '@/presentation/protocols/validations'

type StateErrorsProps = {
    email: string,
    password: string
}

type ValuesProps = {
    email: string,
    password: string
}

type LoginProps = {
    validation: Validation
}

const Login = ({ validation }: LoginProps) => {
    const [stateErrors] = React.useState<StateErrorsProps>({
        email: 'Email obrigatório',
        password: 'Password obrigatório'
    })
    const [isLoading] = React.useState(false)
    const [values, setValues] = React.useState<ValuesProps>({
        email: '',
        password: ''
    })
    React.useEffect(() => {
        validation.validate('email', values.email)
    }, [values.email])

    React.useEffect(() => {
        validation.validate('password', values.password)
    }, [values.password])
    return (
        <div className={Styles.login}>
            <Header />

            <Context.Provider value={{ stateErrors, values, setValues }}>
                <form className={Styles.form}>
                    <h2 className={Styles.formHeader}>Login</h2>
                    <Input type='email' name='email' placeholder='Digite seu e-mail' />
                    <Input type='password' name='password' placeholder='Digite sua senha' />
                    <div className={Styles.buttonContainer}>
                        <Button data-testid='submit-form' variant='filled' disabled type='submit'>Entrar</Button>
                        <span data-testid='status-wrap'>
                            {isLoading && <Spinner />}
                        </span>
                        <Button variant='outlined'>Criar conta</Button>
                    </div>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export type { StateErrorsProps, ValuesProps }
export default Login