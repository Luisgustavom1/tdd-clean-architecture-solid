import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

export const makeAxiosHttpClient = () => {
  const axiosHttpClient = new AxiosHttpClient()
  return axiosHttpClient
}
