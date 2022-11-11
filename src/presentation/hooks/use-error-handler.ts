import { AccessDeniedError } from "@/domain/errors";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ApiContext } from "@/presentation/contexts";

type CallBackType = (error: Error) => void

export const useErrorHandler = (callback: CallBackType): CallBackType => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);
  
  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      history?.replace('/login')
      setCurrentAccount(undefined);
      return;
    }
  
    callback(error)
  }
}