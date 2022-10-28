import { faker } from "@faker-js/faker";
import { AccountModel } from "@/domain/model/account-model";

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.fullName()
})