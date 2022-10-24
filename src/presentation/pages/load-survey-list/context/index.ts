import { SurveyModel } from "@/domain/model";
import React from "react";

interface ISurveyContext {
  surveys: SurveyModel[]
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  reload: boolean
  setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const SurveyContext = React.createContext<ISurveyContext>(null);

export { SurveyContext }