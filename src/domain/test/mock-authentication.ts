import { Authentication } from '@/domain/usecases/authentication'
import { faker } from '@faker-js/faker'
import { mockAccountModel } from '@/domain/test/mock-account'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()
