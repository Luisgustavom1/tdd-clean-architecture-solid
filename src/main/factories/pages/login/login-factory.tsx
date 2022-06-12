import React from 'react'
import RemoteAuthentication from "@/data/usecases/authentication/remote-authentication"
import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client"
import Login from '@/presentation/pages/login'
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuilder } from "@/validation/validators/builder/validator-builder";

export const makeLogin = () => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build()
  ])
  return (
    <Login 
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}