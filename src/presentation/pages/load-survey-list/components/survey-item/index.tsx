import React from "react";
import Styles from "./survey-list-item.scss";

export const SurveyItem = () => {
  return (
    <div className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2020</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </div>
  );
};
