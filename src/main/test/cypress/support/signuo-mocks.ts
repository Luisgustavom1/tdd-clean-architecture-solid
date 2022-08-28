import { faker } from "@faker-js/faker";
import * as Helper from '../support/http-mocks'

export const mockEmailInUserError = (): void => Helper.mockEmailInUserError(/signup/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/, 'POST')
export const mockInvalidData = (): void => Helper.mockOk(/signup/, 'POST', { invalidProperty: faker.datatype.uuid() })
export const mockOk = (): void => Helper.mockOk(/signup/, 'POST', { accessToken: faker.datatype.uuid() })
