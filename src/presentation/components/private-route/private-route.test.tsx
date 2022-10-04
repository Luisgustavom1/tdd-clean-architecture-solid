import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { PrivateRoute } from "./private-route";

const makeSut = () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  render(
    <Router history={history}>
      <PrivateRoute history={history} />
    </Router>
  );

  return { history };
};

describe("<PrivateRoute />", () => {
  it("Should redirect to /login if token is empty", () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe("/login");
  });
});
