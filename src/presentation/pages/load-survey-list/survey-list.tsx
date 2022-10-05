import Footer from "@/presentation/components/footer";
import Header from "@/presentation/components/header";
import { Icon, IconName } from "@/presentation/components/icon";
import Logo from "@/presentation/components/logo";
import React from "react";
import Styles from "./survey-list-styles.scss";

const LoadSurveyList = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          
        </ul>
      </div>

      <Footer />
    </div>
  );
};
export default LoadSurveyList;
