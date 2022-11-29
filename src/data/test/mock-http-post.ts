import { faker } from '@faker-js/faker'
import { HttpGetParams, HttpPostParams } from '../protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: {
    email: 'email'
  }
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: {
    Authorization: faker.random.alphaNumeric
  }
})
