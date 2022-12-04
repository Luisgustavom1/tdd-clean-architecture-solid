import * as Helper from '../support/http-mocks'
import { faker } from "@faker-js/faker";

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/login/, 'POST')
export const mockOk = (): void => Helper.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.fullName() })
export const mockInvalidData = (): void => Helper.mockUnexpectedError(/login/, 'POST')