import React, { useContext } from "react";
import { SurveyContext } from "@/presentation/pages/load-survey-list/context";

export const Error = () => {
  const { error, reload, setReload } = useContext(SurveyContext);

  const handleClick = () => {
    setReload(!reload);
  };

  return (
    <div>
      <span data-testid="error">{error}</span>
      <button onClick={handleClick}>Tentar novamente</button>
    </div>
  );
};
