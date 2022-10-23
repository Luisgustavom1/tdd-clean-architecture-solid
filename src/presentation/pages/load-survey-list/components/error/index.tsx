import React, { useContext } from "react";
import { SurveyContext } from "@/presentation/pages/load-survey-list/context";

export const Error = () => {
  const { error } = useContext(SurveyContext);

  return (
    <div>
      <span data-testid="error">{error}</span>
      <button>Recarregar</button>
    </div>
  );
};
