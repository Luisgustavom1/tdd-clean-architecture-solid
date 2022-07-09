import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Input from '@/presentation/components/input'
import Context from '@/presentation/contexts/form/form-context';

import Styles from './signup-style.scss'

const Signup = () => {
  return (
    <div className={Styles.signup}>
      <Header />

      <Context.Provider value={{
        setValues: () => ({}), stateErrors: {
          email: 'string',
          password: 'string'
        },
        values: {
          email: 'string',
          password: 'string'
        }
      }}>
        <form data-testid='form' className={Styles.form}>
          <h2 className={Styles.formHeader}>Criar conta</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha' />
          <div className={Styles.buttonContainer}>
            <Button data-testid='submit-form' variant='filled' type='submit'>Entrar</Button>
            <Link to='/login'>
              <Button variant='outlined'>Criar conta</Button>
            </Link>
          </div>
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Signup