import React from 'react'
import Signup from '@/presentation/pages/signup'
import { makeSignupValidation } from './signup-validation-factory';
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory';

export const makeSignup = () => {
  return (
    <Signup
      validation={makeSignupValidation()}
      addAccount={makeRemoteAddAccount()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
}