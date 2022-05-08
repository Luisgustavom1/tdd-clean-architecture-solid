import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Input from '@/presentation/components/input'
import Spinner from '@/presentation/components/spinner'
import React from 'react'
import Styles from './login-style.scss'

const Login = () => {
    return (
        <div className={Styles.login}>
            <Header />

            <form className={Styles.form}>
                <h2 className={Styles.formHeader}>Login</h2>
                <Input error='Insira um email válido' type='email' name='email' placeholder='Digite seu e-mail' />
                <Input type='password' name='password' placeholder='Digite sua senha' />

                <div className={Styles.buttonContainer}>
                    <Button variant='filled' type='submit'>Entrar</Button>
                    <Spinner />
                    <Button variant='outlined' type='submit'>Criar conta</Button>
                </div>
            </form>

            <Footer />
        </div>
    )
}

export default Login