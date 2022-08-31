import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '@/presentation/styles/global.scss'
import LoadSurveyList from '@/presentation/pages/load-survey-list/survey-list';

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
          <Route path="/" exact component={LoadSurveyList} />
        </Switch>
      </BrowserRouter>
    );
}

export default Router;