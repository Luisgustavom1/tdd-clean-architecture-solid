import { AccountModel } from "@/domain/model"
import { UpdateCurrentAccount } from "@/domain/usecases/save-access-token"

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountModel
  async save(account: AccountModel): Promise<void> {
    this.account = account
  }
}
