import { mockSurveyModel } from "@/domain/test";
import { render, screen } from "@testing-library/react";
import { SurveyItem } from ".";
import React from "react";
import { IconName } from "@/presentation/components/icon";

describe("SurveyItem component", () => {
  it("Should render with correct values", () => {
    const survey = mockSurveyModel();
    survey.didAnswer = true;
    survey.date = new Date("2022-01-10T00:00:00");
    render(<SurveyItem survey={survey} />);
    expect(screen.getByTestId("icon")).toHaveProperty(
      "src",
      IconName.thumbDown
    );
    expect(screen.getByTestId("question").textContent).toBe(survey.question);
    expect(screen.getByTestId("day").textContent).toBe('10');
    expect(screen.getByTestId("month").textContent).toBe('jan');
    expect(screen.getByTestId("year").textContent).toBe('2022');
  });
});
