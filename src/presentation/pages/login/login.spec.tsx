import React from "react";
import { faker } from "@faker-js/faker";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Login from ".";
import { InvalidCredentialsError } from "@/domain/errors";
import {
  Helper,
  ValidationStub,
  UpdateCurrentAccountMock,
  AuthenticationSpy,
} from "@/presentation/test";
import { act } from "react-dom/test-utils";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  updateCurrentAccountMock: UpdateCurrentAccountMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ["/login"] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const updateCurrentAccountMock = new UpdateCurrentAccountMock();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  );

  return { sut, authenticationSpy, updateCurrentAccountMock };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, "password", password);
  Helper.populateField(sut, "email", email);
  const form = sut.getByTestId("form");
  await act(async () => {
    fireEvent.submit(form);
  });
  await waitFor(() => form);
};

describe("<Login />", () => {
  afterEach(cleanup);
  it("Should start with initial state", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.testChildCount(sut, "status-wrap", 0);

    Helper.testStatusForField(sut, "email", validationError);
    Helper.testStatusForField(sut, "password", validationError);

    const submitForm = sut.getByTestId("submit-form") as HTMLButtonElement;
    expect(submitForm.disabled).toBe(true);
  });

  it("Should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "email");
    Helper.testStatusForField(sut, "email", validationError);
  });

  it("Should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "password");
    Helper.testStatusForField(sut, "password", validationError);
  });

  it("Should show valid email state if Validation success", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "email");
    Helper.testStatusForField(sut, "email");
  });

  it("Should show valid password state if Validation success", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "password");
    Helper.testStatusForField(sut, "password");
  });

  it("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "password");
    Helper.populateField(sut, "email");
    const submitButton = sut.getByTestId("submit-form") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it("Should show spinner on submit", async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    Helper.testElementExists(sut, "spinner");
  });

  it("Should call Authentication with correct values", async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it("Should call Authentication only once", async () => {
    const { authenticationSpy, sut } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it("Should not call Authentication it form is invalid", async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it("Should present error if Authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, "auth")
      .mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit(sut);
    Helper.testElementText(sut, "main-error", error.message);
    Helper.testChildCount(sut, "status-wrap", 1);
  });

  it("Should present error if SaveAcessToken fails", async () => {
    const { sut, updateCurrentAccountMock } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(updateCurrentAccountMock, "save").mockRejectedValueOnce(error);
    await simulateValidSubmit(sut);
    Helper.testElementText(sut, "main-error", error.message);
    Helper.testChildCount(sut, "status-wrap", 1);
  });

  it("Should call SaveAcessToken on success", async () => {
    const { sut, authenticationSpy, updateCurrentAccountMock } = makeSut();
    await simulateValidSubmit(sut);
    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  it("Should go to signup page", async () => {
    const { sut } = makeSut();
    const buttonRegister = sut.getByRole("button", { name: "Criar conta" });
    fireEvent.click(buttonRegister);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/signup");
  });
});
