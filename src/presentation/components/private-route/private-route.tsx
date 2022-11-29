import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

export const PrivateRoute = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext)
  return getCurrentAccount()?.accessToken
    ? (
    <Route {...props} />
      )
    : (
    <Route {...props} component={() => <Redirect to="/login" />} />
      )
}
