import { SurveyModel } from "@/domain/model";
import { LoadSurveyList } from "@/domain/usecases";
import Footer from "@/presentation/components/footer";
import Header from "@/presentation/components/header";
import React, { useEffect, useState } from "react";
import { SurveyItem } from "./components/survey-item";
import { SurveyItemEmpty } from "./components/survey-item-empty";
import Styles from "./survey-list-styles.scss";

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList = ({ loadSurveyList }: Props) => {
  const [surveys, setSurveys] = useState<SurveyModel[]>([]);
  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => {
      setSurveys(surveys);
    });
  }, []);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {surveys.length > 0 ? (
            surveys.map((survey) => (
              <SurveyItem key={survey.id} survey={survey} />
            ))
          ) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
