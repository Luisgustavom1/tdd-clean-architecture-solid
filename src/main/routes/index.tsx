import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "@/presentation/styles/global.scss";
import LoadSurveyList from "@/presentation/pages/load-survey-list/survey-list";
import { makeLogin } from "@/main/factories/pages/login/login-factory";
import { makeSignup } from "@/main/factories/pages/signup/singup-factory";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignup} />
        <Route path="/" exact component={LoadSurveyList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
