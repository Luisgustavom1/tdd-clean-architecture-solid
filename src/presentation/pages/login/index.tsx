import React from "react";
import { Link, useHistory } from "react-router-dom";

import Button from "@/presentation/components/button";
import Footer from "@/presentation/components/footer";
import Header from "@/presentation/components/header";
import Input from "@/presentation/components/input";
import Spinner from "@/presentation/components/spinner";
import Context from "@/presentation/contexts/form/form-context";

import Styles from "./login-style.scss";
import { Validation } from "@/presentation/protocols/validations";
import { Authentication, SaveAccesssToken } from "@/domain/usecases";

type ValuesProps = {
  email: string;
  password: string;
};

type StateErrorsProps = {
  emailError: string;
  passwordError: string;
};

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccesssToken;
};

const Login = ({ validation, authentication, saveAccessToken }: LoginProps) => {
  const history = useHistory();
  const [isFormInvalid, setisFormInvalid] = React.useState(true);
  const [stateErrors, setStateErrors] = React.useState<StateErrorsProps>({
    emailError: "",
    passwordError: "",
  });
  const [mainError, setMainError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState<ValuesProps>({
    email: "",
    password: "",
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isLoading || isFormInvalid) return;

      setIsLoading(true);
      const account = await authentication.auth({ ...values });
      await saveAccessToken.save(account.accessToken);
      history.replace("/");
    } catch (error) {
      setMainError(error.message);
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    const emailError = validation.validate("email", values.email);
    const passwordError = validation.validate("password", values.password);

    setStateErrors({
      ...stateErrors,
      emailError,
      passwordError,
    });
    setisFormInvalid(!!(emailError || passwordError))
  }, [values.email, values.password]);

  return (
    <div className={Styles.login}>
      <Header />

      <Context.Provider value={{ stateErrors, values, setValues }}>
        <form
          data-testid="form"
          onSubmit={handleSubmit}
          className={Styles.form}
        >
          <h2 className={Styles.formHeader}>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <div className={Styles.buttonContainer}>
            <Button
              data-testid="submit-form"
              variant="filled"
              disabled={isFormInvalid}
              type="submit"
            >
              Entrar
            </Button>
            <span data-testid="status-wrap">
              {isLoading && <Spinner />}
              {mainError && <div data-testid="main-error">{mainError}</div>}
            </span>
            <Link to="/signup">
              <Button variant="outlined">Criar conta</Button>
            </Link>
          </div>
        </form>
      </Context.Provider>

      <Footer />
    </div>
  );
};

export type { StateErrorsProps, ValuesProps };
export default Login;
