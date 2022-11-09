import React from "react";
import { ApiContext } from "@/presentation/contexts";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Header from ".";
import { Router } from "react-router-dom";
import { mockAccountModel } from "@/domain/test";

const makeSut = (account = mockAccountModel()) => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => account,
      }}
    >
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  );

  return {
    history,
    setCurrentAccountMock,
  };
};

describe("<Header />", () => {
  it("Should call setCurrentAccount with null", () => {
    const { history, setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByText("Sair"));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe("/login");
  });

  it("Should render username correctly", () => {
    const account = mockAccountModel()
    makeSut(account);
    expect(screen.getByTestId("username").textContent).toBe(account.name);
  });
});
