import { LoadSurveyList } from "@/domain/usecases";
import React from "react";

interface ISurveyContext {
  surveys: LoadSurveyList.Model[]
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  reload: boolean
  setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const SurveyContext = React.createContext<ISurveyContext>(null);

export { SurveyContext }