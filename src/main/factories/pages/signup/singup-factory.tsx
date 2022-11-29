import React from 'react'
import Signup from '@/presentation/pages/signup'
import { makeSignupValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account'

export const makeSignup = () => {
  return (
    <Signup
      validation={makeSignupValidation()}
      addAccount={makeRemoteAddAccount()}
    />
  )
}
