import React from "react";
import { Link, useHistory } from "react-router-dom";

import Button from "@/presentation/components/button";
import Footer from "@/presentation/components/footer";
import Header from "@/presentation/components/header";
import Input from "@/presentation/components/input";
import Context from "@/presentation/contexts/form/form-context";

import Styles from "./signup-style.scss";
import Spinner from "@/presentation/components/spinner";
import { Validation } from "@/presentation/protocols/validations";
import { UpdateCurrentAccount, AddAccount } from "@/domain/usecases";

type ValuesProps = {
  name: string;
  email: string;
  passwordConfirmation: string;
  password: string;
};

type UnionToIntersection<T> = (T extends any ? (k: T) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type StateErrorsProps = UnionToIntersection<
  {
    [K in keyof ValuesProps]: Record<`${K}Error`, string>;
  }[keyof ValuesProps]
>;

type LoginProps = {
  validation: Validation;
  addAccount: AddAccount;
  updateCurrentAccount: UpdateCurrentAccount;
};

const SignUp = ({ validation, addAccount, updateCurrentAccount }: LoginProps) => {
  const history = useHistory();
  const [isFormInvalid, setisFormInvalid] = React.useState(true);
  const [stateErrors, setStateErrors] = React.useState<StateErrorsProps>({
    nameError: "",
    emailError: "",
    passwordError: "Campo obrigatório",
    passwordConfirmationError: "Campo obrigatório",
  });
  const [mainError, setMainError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState<ValuesProps>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (isLoading || isFormInvalid) {
        return;
      }
      const account = await addAccount.add(values);
      await updateCurrentAccount.save(account);
      history.replace("/");
    } catch (error) {
      setMainError(error.message);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const formData = { ...values };
    const nameError = validation.validate("name", formData);
    const emailError = validation.validate("email", formData);
    const passwordError = validation.validate("password", formData);
    const passwordConfirmationError = validation.validate(
      "passwordConfirmation",
      values
    );
    setStateErrors({
      ...stateErrors,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
    });
    setisFormInvalid(
      !!(emailError || passwordError || nameError || passwordConfirmationError)
    );
  }, [values.name, values.email, values.password, values.passwordConfirmation]);
  return (
    <div className={Styles.signupWrap}>
      <Header />

      <Context.Provider value={{ setValues, stateErrors, values }}>
        <form
          data-testid="form"
          onSubmit={handleSubmit}
          className={Styles.form}
        >
          <h2 className={Styles.formHeader}>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <div className={Styles.buttonContainer}>
            <Button
              data-testid="submit-form"
              variant="filled"
              type="submit"
              disabled={isFormInvalid}
            >
              Entrar
            </Button>
            <span data-testid="status-wrap">
              {isLoading && <Spinner />}
              {mainError && <div data-testid="main-error">{mainError}</div>}
            </span>
            <Link to="/login" data-testid="login-link" replace>
              <Button variant="outlined">Voltar para o login</Button>
            </Link>
          </div>
        </form>
      </Context.Provider>

      <Footer />
    </div>
  );
};

export default SignUp;
