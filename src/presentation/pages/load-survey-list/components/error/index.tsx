import React, { useContext } from "react";
import { SurveyContext } from "@/presentation/pages/load-survey-list/context";
import Button from "@/presentation/components/button";
import Styles from './error-style.scss'

export const Error = () => {
  const { error, setError, reload, setReload } = useContext(SurveyContext);

  const handleClick = () => {
    setError("");
    setReload(!reload);
  };

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <Button variant="filled" data-testid='reload' onClick={handleClick}>
        Tentar novamente
      </Button>
    </div>
  );
};
