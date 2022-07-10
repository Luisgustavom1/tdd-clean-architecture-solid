import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Input from '@/presentation/components/input'
import Context from '@/presentation/contexts/form/form-context';

import Styles from './signup-style.scss'
import Spinner from '@/presentation/components/spinner'
import { Validation } from '@/presentation/protocols/validations'

type ValuesProps = {
  name: string,
  email: string,
  passwordConfirmation: string,
  password: string
}

type StateErrorsProps = {
  [K in keyof ValuesProps]: Record<`${K}Error`, string>
}[keyof ValuesProps]

type LoginProps = {
  validation: Validation
}

const SignUp = ({ validation }: LoginProps) => {
  const [stateErrors, setStateErrors] = React.useState<StateErrorsProps>({
    nameError: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório'
  })
  const [mainError, setMainError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const [values, setValues] = React.useState<ValuesProps>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  React.useEffect(() => {
    setStateErrors({
      ...stateErrors,
      emailError: validation.validate('email', values.email),
      nameError: validation.validate('name', values.name),
    })
  }, [values.name])
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