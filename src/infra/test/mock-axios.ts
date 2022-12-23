import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockHttpResponse = () => ({
  data: {
    email: 'email'
  },
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
