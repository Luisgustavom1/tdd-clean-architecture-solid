import { SurveyModel } from "@/domain/model";
import { Icon, IconName } from "@/presentation/components/icon";
import React from "react";
import Styles from "./survey-list-item.scss";

type Props = {
  survey: SurveyModel;
};

export const SurveyItem = ({ survey }: Props) => {
  return (
    <div className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon
          className={Styles.iconWrap}
          icon={survey.didAnswer ? IconName.thumbUp : IconName.thumbDown}
        />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate().toString().padStart(2, "0")}
          </span>
          <span data-testid="month" className={Styles.month}>
            {survey.date
              .toLocaleString("pt-BR", { month: "short" })
              .replace(".", "")}
          </span>
          <span data-testid="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </div>
  );
};
