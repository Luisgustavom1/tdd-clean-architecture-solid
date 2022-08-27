import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
  act,
} from "@testing-library/react";
import SignUp from "./signup";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  Helper,
  AddAccountSpy,
  ValidationStub,
  SaveAccessTokenMock,
} from "@/presentation/test";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "@/domain/errors";

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  name = faker.word.noun(),
  password = faker.internet.password()
) => {
  Helper.populateField(sut, "name", name);
  Helper.populateField(sut, "email", email);
  Helper.populateField(sut, "password", password);
  Helper.populateField(sut, "passwordConfirmation", password);
  const form = sut.getByTestId("submit-form") as HTMLButtonElement;
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
  const saveAccessTokenMock = new SaveAccessTokenMock();
  const sut = render(
    <Router history={history}>
      <SignUp
        validation={validationStub}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );

  return { sut, addAccountSpy, saveAccessTokenMock };
};

describe("<SignUp />", () => {
  it("Should start with initial state", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.testChildCount(sut, "status-wrap", 0);

    Helper.testStatusForField(sut, "name", validationError);
    Helper.testStatusForField(sut, "email", validationError);
    Helper.testStatusForField(sut, "password", validationError);
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);

    const submitForm = sut.getByTestId("submit-form") as HTMLButtonElement;
    expect(submitForm.disabled).toBe(true);
  });

  it("Should show name error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "name");
    Helper.testStatusForField(sut, "name", validationError);
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

  it("Should show passwordConfirmation error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "passwordConfirmation");
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);
  });

  it("Should show valid name state if Validation success", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "name");
    Helper.testStatusForField(sut, "name");
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

  it("Should show valid passwordConfirmation state if Validation success", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "passwordConfirmation");
    Helper.testStatusForField(sut, "passwordConfirmation");
  });

  it("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "name");
    Helper.populateField(sut, "email");
    Helper.populateField(sut, "password");
    Helper.populateField(sut, "passwordConfirmation");
    const submitButton = sut.getByTestId("submit-form") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it("Should show spinner on submit", async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    Helper.testElementExists(sut, "spinner");
  });

  it("Should call AddAccount with correct values", async () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, name, password);
    expect(addAccountSpy.params).toEqual({
      email,
      name,
      password,
      passwordConfirmation: password,
    });
  });

  it("Should call AddAccount only once", async () => {
    const { sut, addAccountSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(addAccountSpy.callsCount).toBe(1);
  });

  it("Should not call AddAccount if form is invalid", async () => {
    const validationError = faker.random.words();
    const { sut, addAccountSpy } = makeSut({ validationError });
    await simulateValidSubmit(sut);
    expect(addAccountSpy.callsCount).toBe(0);
  });

  it("Should present error if AddAccount fails", async () => {
    const { sut, addAccountSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(addAccountSpy, "add").mockRejectedValueOnce(error);
    await simulateValidSubmit(sut);
    Helper.testElementText(sut, "main-error", error.message);
    Helper.testChildCount(sut, "status-wrap", 1);
  });

  it("Should call SaveAcessToken on success", async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut();
    await simulateValidSubmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(
      addAccountSpy.account.accessToken
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  it("Should present error if SaveAcessToken fails", async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(saveAccessTokenMock, "save").mockRejectedValueOnce(error);
    await simulateValidSubmit(sut);
    Helper.testElementText(sut, "main-error", error.message);
    Helper.testChildCount(sut, "status-wrap", 1);
  });
});
