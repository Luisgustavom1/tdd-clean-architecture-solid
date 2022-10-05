import { render, screen } from "@testing-library/react";
import SurveyList from "./survey-list";
import React from "react";

const makeSut = () => {
  render(<SurveyList />)
}

describe("SurveyList Component", () => {
  it("Should present 4 empty items on start", () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
  });
});
