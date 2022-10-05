import Footer from "@/presentation/components/footer";
import Header from "@/presentation/components/header";
import React from "react";
import { SurveyItemEmpty } from "./components/survey-item-empty";
import Styles from "./survey-list-styles.scss";

const SurveyList = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
