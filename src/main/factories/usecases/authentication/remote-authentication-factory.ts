import RemoteAuthentication from "@/data/usecases/authentication/remote-authentication";
import { makeApiUrl } from "../../http/api-url-factory";
import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";

export const makeRemoteAuthentication = () => {
  const remoteAuthentication = new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient());
  return remoteAuthentication
}