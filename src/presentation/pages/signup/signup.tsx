import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Input from '@/presentation/components/input'
import Context from '@/presentation/contexts/form/form-context';

import Styles from './signup-style.scss'
import Spinner from '@/presentation/components/spinner'

type StateErrorsProps = {
  email: string,
  password: string
}

type ValuesProps = {
  email: string,
  password: string
}

const SignUp = () => {
  const [stateErrors, setStateErrors] = React.useState<StateErrorsProps>({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório'
  })
  const [mainError, setMainError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const [values, setValues] = React.useState<ValuesProps>({
    email: '',
    password: ''
  })

  return (
    <div className={Styles.signup}>
      <Header />

      <Context.Provider value={{ setValues, stateErrors, values }}>
        <form data-testid='form' className={Styles.form}>
          <h2 className={Styles.formHeader}>Criar conta</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha' />
          <div className={Styles.buttonContainer}>
            <Button data-testid='submit-form' disabled variant='filled' type='submit'>Entrar</Button>
            <span data-testid='status-wrap'>
              {isLoading && <Spinner />}
              {mainError &&
                <div data-testid='main-error'>
                  {mainError}
                </div>
              }
            </span>
            <a href='/login'>
              <Button variant='outlined'>Criar conta</Button>
            </a>
          </div>
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp