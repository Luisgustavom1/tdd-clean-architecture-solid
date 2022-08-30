import { faker } from "@faker-js/faker"
import { HttpPostParams } from "../protocols/http"

export const mockPostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: {
        email: 'email',
    }
})

export const mockGetRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url()
})