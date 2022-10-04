import React from "react";
import { Redirect, Route, RouterProps } from "react-router-dom";

export const PrivateRoute = (props: RouterProps) => {
  return <Route {...props} component={() => <Redirect to="/login" />} />;
};
