import { SurveyModel } from "@/domain/model";
import React from "react";

interface ISurveyContext {
  surveys: SurveyModel[]
  error: string
}

const SurveyContext = React.createContext<ISurveyContext>(null);

export { SurveyContext }