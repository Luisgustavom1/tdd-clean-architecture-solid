import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '@/presentation/styles/global.scss'

type Props = {
  makeLogin: React.ComponentType<any>;
  makeSignup: React.ComponentType<any>;
};

const Router = ({ makeLogin, makeSignup }: Props) => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignup} />
        </Switch>
      </BrowserRouter>
    );
}

export default Router;