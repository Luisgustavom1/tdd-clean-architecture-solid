import React from 'react'
import Login from '@/presentation/pages/login'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { makeLoginValidation } from './login-validation-factory';

export const makeLogin = () => {
  return (
    <Login 
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}