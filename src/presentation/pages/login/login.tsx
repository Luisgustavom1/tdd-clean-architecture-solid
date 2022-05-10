import React from 'react'

import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Input from '@/presentation/components/input'
import Spinner from '@/presentation/components/spinner'
import Context from '@/presentation/contexts/form/form-context';

import Styles from './login-style.scss'

type StateErrorsProps = {
    email: string,
    password: string
}

const Login = () => {
    const [stateErrors] = React.useState<StateErrorsProps>({
        email: 'Email obrigatório',
        password: 'Password obrigatório'
    })
    const [isLoading] = React.useState(false)
    return (
        <div className={Styles.login}>
            <Header />

            <Context.Provider value={stateErrors}>
                <form className={Styles.form}>
                    <h2 className={Styles.formHeader}>Login</h2>
                    <Input type='email' name='email' placeholder='Digite seu e-mail' />
                    <Input type='password' name='password' placeholder='Digite sua senha' />
                    <div className={Styles.buttonContainer}>
                        <Button data-testid='submit-form' variant='filled' disabled type='submit'>Entrar</Button>
                        <span data-testid='status-wrap'>
                            { isLoading && <Spinner /> }
                        </span>
                        <Button variant='outlined'>Criar conta</Button>
                    </div>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export type { StateErrorsProps }
export default Login