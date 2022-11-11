import { AccessDeniedError } from "@/domain/errors";
import { LoadSurveyList } from "@/domain/usecases";
import Footer from "@/presentation/components/footer";
import Header from "@/presentation/components/header";
import { ApiContext } from "@/presentation/contexts";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Error } from "./components/error";
import { SurveyItemList } from "./components/list";
import { SurveyContext } from "./context";
import Styles from "./survey-list-styles.scss";

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList = ({ loadSurveyList }: Props) => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);
  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>([]);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setSurveys(surveys);
      })
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          history?.replace('/login')
          setCurrentAccount(undefined);
          return;
        }
        setError(error.message);
      });
  }, [reload]);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider
          value={{ surveys, error, setError, reload, setReload }}
        >
          {error ? <Error /> : <SurveyItemList />}
        </SurveyContext.Provider>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
