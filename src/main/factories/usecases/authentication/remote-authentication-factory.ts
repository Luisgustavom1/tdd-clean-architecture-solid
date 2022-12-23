import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteAuthentication = () => {
  const remoteAuthentication = new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
  return remoteAuthentication
}
