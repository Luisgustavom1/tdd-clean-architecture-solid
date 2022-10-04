import { ApiContext } from "@/presentation/contexts";
import React, { useContext } from "react";
import { Redirect, Route, RouterProps } from "react-router-dom";

export const PrivateRoute = (props: RouterProps) => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken ? (
    <Route {...props} />
  ) : (
    <Route {...props} component={() => <Redirect to="/login" />} />
  );
};
