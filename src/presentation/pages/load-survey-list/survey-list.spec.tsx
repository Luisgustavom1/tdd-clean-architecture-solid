import { render, screen, waitFor } from "@testing-library/react";
import SurveyList from "./survey-list";
import React from "react";
import { LoadSurveyList } from "@/domain/usecases";
import { SurveyModel } from "@/domain/model";
import { mockSurveyListModel } from "@/domain/test";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);

  return {
    loadSurveyListSpy,
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
  });
});
