import { AddAccountParams } from "@/domain/usecases/add-account";
import { faker } from "@faker-js/faker";
import { AccountModel } from "../model";

export const mockAddAccount = (): AddAccountParams => ({
    name: faker.database.column(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordConfirmation: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
    accessToken: faker.datatype.uuid(),
    name: faker.name.fullName()
})