import { AddAccount } from "@/domain/usecases/add-account";
import { faker } from "@faker-js/faker";
import { mockAccountModel } from "@/domain/test";

export const mockAddAccount = (): AddAccount.Params => ({
    name: faker.database.column(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordConfirmation: faker.internet.password()
})

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()