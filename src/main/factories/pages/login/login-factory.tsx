import React from "react";
import Login from "@/presentation/pages/login";
import { makeLoginValidation } from "./login-validation-factory";
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { makeLocalUpdateCurrentAccount } from "@/main/factories/usecases/update-current-account/local-save-access-token-factory";

export const makeLogin = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};
