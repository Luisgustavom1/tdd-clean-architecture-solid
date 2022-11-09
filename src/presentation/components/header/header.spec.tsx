import React from "react";
import { ApiContext } from "@/presentation/contexts";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Header from ".";
import { Router } from "react-router-dom";

describe("<Header />", () => {
  it("Should call setCurrentAccount with null", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const setCurrentAccountMock = jest.fn();
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    );
    fireEvent.click(screen.getByText("Sair"));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe("/login");
  });
});
