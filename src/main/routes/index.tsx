import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '@/presentation/styles/global.scss'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { ApiContext } from '@/presentation/contexts'
import { makeSignup } from '@/main/factories/pages/signup/singup-factory'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components/private-route/private-route'
import { makeSurveyList } from '../factories/pages/survey-list/survey-list-factory'

const Router = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignup} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
