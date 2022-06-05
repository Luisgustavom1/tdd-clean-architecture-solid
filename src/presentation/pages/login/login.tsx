import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Input from '@/presentation/components/input'
import Spinner from '@/presentation/components/spinner'
import Context from '@/presentation/contexts/form/form-context';

import Styles from './login-style.scss'
import { Validation } from '@/presentation/protocols/validations'
import { Authentication } from '@/domain/usecases'

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
    authentication: Authentication
}

const Login = ({ validation, authentication }: LoginProps) => {
    const history = useHistory();
    const [stateErrors, setStateErrors] = React.useState<StateErrorsProps>({
        email: '',
        password: ''
    })
    const [mainError, setMainError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)
    const [values, setValues] = React.useState<ValuesProps>({
        email: '',
        password: ''
    })
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (isLoading || stateErrors.email || stateErrors.password) {
                return
            }
            setIsLoading(true)
            const account = await authentication.auth({ ...values })
            localStorage.setItem('accessToken', account.accessToken)
            history.replace('/')
        } catch (error) {
            setIsLoading(false)
            setMainError(error.message)
        }
    }
    React.useEffect(() => {
        setStateErrors({
            ...stateErrors,
            email: validation.validate('email', values.email),
            password: validation.validate('password', values.password)
        })
    }, [values.email, values.password])

    return (
        <div className={Styles.login}>
            <Header />

            <Context.Provider value={{ stateErrors, values, setValues }}>
                <form data-testid='form' onSubmit={handleSubmit} className={Styles.form}>
                    <h2 className={Styles.formHeader}>Login</h2>
                    <Input type='email' name='email' placeholder='Digite seu e-mail' />
                    <Input type='password' name='password' placeholder='Digite sua senha' />
                    <div className={Styles.buttonContainer}>
                        <Button data-testid='submit-form' variant='filled' disabled={!!(stateErrors.email || stateErrors.password)} type='submit'>Entrar</Button>
                        <span data-testid='status-wrap'>
                            {isLoading && <Spinner />}
                            {mainError && <div data-testid='main-error'>
                                {mainError}
                            </div>}
                        </span>
                        <Link to='/signup'>
                            <Button variant='outlined'>Criar conta</Button>
                        </Link>
                    </div>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export type { StateErrorsProps, ValuesProps }
export default Login