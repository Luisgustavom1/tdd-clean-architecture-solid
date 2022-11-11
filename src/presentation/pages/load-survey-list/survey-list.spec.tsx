import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SurveyList from "./survey-list";
import React from "react";
import { LoadSurveyList } from "@/domain/usecases";
import { mockAccountModel, mockSurveyListModel } from "@/domain/test";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { ApiContext } from "@/presentation/contexts";
import { createMemoryHistory, MemoryHistory } from "history";
import { AccountModel } from "@/domain/model";
import { act } from "react-dom/test-utils";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
  history: MemoryHistory;
  setCurrentAccount: (account: AccountModel) => void;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const setCurrentAccount = jest.fn();
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount,
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyList loadSurveyList={loadSurveyListSpy} />
    </ApiContext.Provider>
  );

  return {
    loadSurveyListSpy,
    history,
    setCurrentAccount,
  };
};

describe("SurveyList Component", () => {
  it("Should present 4 empty items on start", async () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
    await waitFor(() => surveyList);
  });

  it("Should call LoadSurveyList", async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole("heading"));
  });

  it("Should render SurveyItems on success", async () => {
    makeSut();
    expect(await screen.findAllByTestId("survey-item")).toHaveLength(2);
    expect(screen.queryByTestId("error")).toBeFalsy();
  });

  it("Should render render erros on failure", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);
    expect((await screen.findByTestId("error")).textContent).toBe(
      error.message
    );
  });

  it("Should logout on accessDeniedError", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest
      .spyOn(loadSurveyListSpy, "loadAll")
      .mockRejectedValueOnce(new AccessDeniedError());
    const { setCurrentAccount } = makeSut(loadSurveyListSpy);
    await waitFor(() => screen.getByRole("heading"));
    expect(setCurrentAccount).toHaveBeenCalledWith(undefined);
  });

  it("Should call loadSurveyList on reload", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest
      .spyOn(loadSurveyListSpy, "loadAll")
      .mockRejectedValueOnce(new UnexpectedError());
    await act(async () => {
      makeSut(loadSurveyListSpy);
    });
    fireEvent.click(
      await screen.findByRole("button", { name: /tentar novamente/i })
    );
    await waitFor(() => screen.getByRole("heading"));
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
