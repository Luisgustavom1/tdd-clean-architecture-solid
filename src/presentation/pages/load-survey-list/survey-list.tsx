import { SurveyModel } from "@/domain/model";
import { LoadSurveyList } from "@/domain/usecases";
import Footer from "@/presentation/components/footer";
import Header from "@/presentation/components/header";
import React, { useEffect, useState } from "react";
import { Error } from "./components/error";
import { SurveyItemList } from "./components/list";
import { SurveyContext } from "./context";
import Styles from "./survey-list-styles.scss";

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList = ({ loadSurveyList }: Props) => {
  const [surveys, setSurveys] = useState<SurveyModel[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setSurveys(surveys);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ surveys, error }}>
          {error ? <Error /> : <SurveyItemList />}
        </SurveyContext.Provider>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
