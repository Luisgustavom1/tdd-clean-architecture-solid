import { faker } from "@faker-js/faker"
import { HttpPostParams } from "../protocols/http"

export const makePostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: {
        email: 'email',
    }
})