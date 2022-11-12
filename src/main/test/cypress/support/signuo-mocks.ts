import { faker } from "@faker-js/faker";
import * as Http from '../support/http-mocks'

export const mockEmailInUserError = (): void => Http.mockForbiddenError(/signup/, 'POST')
export const mockUnexpectedError = (): void => Http.mockServerError(/signup/, 'POST')
export const mockOk = (): void => Http.mockOk(/signup/, 'POST', { accessToken: faker.datatype.uuid(), nae: faker.name.fullName() })
