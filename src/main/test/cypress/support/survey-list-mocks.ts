import * as Http from './http-mocks'

export const mockUnexpctedError = (): void => Http.mockServerError(/surveys/, 'GET')
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'GET')