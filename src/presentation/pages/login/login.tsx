import React from 'react'

import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Input from '@/presentation/components/input'
import Spinner from '@/presentation/components/spinner'
import Context from '@/presentation/contexts/form/form-context';

import Styles from './login-style.scss'

type StateProps = {
    isLoading: boolean,
    errorMessage: string
}

const Login = () => {
    const [state, setState] = React.useState<StateProps>({
        isLoading: false,
        errorMessage: ''
    })
    return (
        <div className={Styles.login}>
            <Header />

            <Context.Provider value={state}>
                <form className={Styles.form}>
                    <h2 className={Styles.formHeader}>Login</h2>
                    <Input error={state.errorMessage} type='email' name='email' placeholder='Digite seu e-mail' />
                    <Input type='password' name='password' placeholder='Digite sua senha' />
                    <div className={Styles.buttonContainer}>
                        <Button variant='filled' type='submit'>Entrar</Button>
                        <span data-testid='status-wrap'>
                            { state.isLoading && <Spinner /> }
                        </span>
                        <Button variant='outlined' type='submit'>Criar conta</Button>
                    </div>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Login