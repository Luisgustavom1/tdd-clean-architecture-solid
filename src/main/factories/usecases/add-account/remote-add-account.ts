import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteAddAccount = () => {
  const remoteAuthentication = new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
  return remoteAuthentication
}
