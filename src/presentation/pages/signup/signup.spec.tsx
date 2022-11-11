import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  act,
  screen,
} from "@testing-library/react";
import SignUp from ".";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Helper, AddAccountSpy, ValidationStub } from "@/presentation/test";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "@/domain/errors";
import { ApiContext } from "@/presentation/contexts";
import { AddAccount } from "@/domain/usecases";

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (value: AddAccount.Model) => void;
};

type SutParams = {
  validationError: string;
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  name = faker.word.noun(),
  password = faker.internet.password()
) => {
  Helper.populateField("name", name);
  Helper.populateField("email", email);
  Helper.populateField("password", password);
  Helper.populateField("passwordConfirmation", password);
  const form = screen.getByTestId("submit-form") as HTMLButtonElement;
  await act(async () => {
    fireEvent.submit(form);
  });
  await waitFor(() => form);
};

const history = createMemoryHistory({ initialEntries: ["/signup"] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();
  const sut = render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: jest.fn(),
      }}
    >
      <Router history={history}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  );

  return { addAccountSpy, setCurrentAccountMock };
};

describe("<SignUp />", () => {
  it("Should start with initial state", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helper.testChildCount("status-wrap", 0);

    Helper.testStatusForField("name", validationError);
    Helper.testStatusForField("email", validationError);
    Helper.testStatusForField("password", validationError);
    Helper.testStatusForField("passwordConfirmation", validationError);

    const submitForm = screen.getByTestId("submit-form") as HTMLButtonElement;
    expect(submitForm.disabled).toBe(true);
  });

  it("Should show name error if Validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField("name");
    Helper.testStatusForField("name", validationError);
  });

  it("Should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField("email");
    Helper.testStatusForField("email", validationError);
  });

  it("Should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField("password");
    Helper.testStatusForField("password", validationError);
  });

  it("Should show passwordConfirmation error if Validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField("passwordConfirmation");
    Helper.testStatusForField("passwordConfirmation", validationError);
  });

  it("Should show valid name state if Validation success", () => {
    makeSut();
    Helper.populateField("name");
    Helper.testStatusForField("name");
  });

  it("Should show valid email state if Validation success", () => {
    makeSut();
    Helper.populateField("email");
    Helper.testStatusForField("email");
  });

  it("Should show valid password state if Validation success", () => {
    makeSut();
    Helper.populateField("password");
    Helper.testStatusForField("password");
  });

  it("Should show valid passwordConfirmation state if Validation success", () => {
    makeSut();
    Helper.populateField("passwordConfirmation");
    Helper.testStatusForField("passwordConfirmation");
  });

  it("Should enable submit button if form is valid", () => {
    makeSut();
    Helper.populateField("name");
    Helper.populateField("email");
    Helper.populateField("password");
    Helper.populateField("passwordConfirmation");
    const submitButton = screen.getByTestId("submit-form") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it("Should show spinner on submit", async () => {
    makeSut();
    await simulateValidSubmit();
    Helper.testElementExists("spinner");
  });

  it("Should call AddAccount with correct values", async () => {
    const { addAccountSpy } = makeSut();
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(email, name, password);
    expect(addAccountSpy.params).toEqual({
      email,
      name,
      password,
      passwordConfirmation: password,
    });
  });

  it("Should call AddAccount only once", async () => {
    const { addAccountSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(1);
  });

  it("Should not call AddAccount if form is invalid", async () => {
    const validationError = faker.random.words();
    const { addAccountSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(0);
  });

  it("Should present error if AddAccount fails", async () => {
    const { addAccountSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(addAccountSpy, "add").mockRejectedValueOnce(error);
    await simulateValidSubmit();
    Helper.testElementText("main-error", error.message);
    Helper.testChildCount("status-wrap", 1);
  });

  it("Should call SaveAcessToken on success", async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toBeCalledWith(addAccountSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  it("Should go to login page", async () => {
    makeSut();
    const loginLink = screen.getByTestId("login-link");
    fireEvent.click(loginLink);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/login");
  });
});
