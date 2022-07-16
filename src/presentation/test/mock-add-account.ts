import { AccountModel } from "@/domain/model"
import { mockAccountModel } from "@/domain/test"
import { AddAccount, AddAccountParams } from "@/domain/usecases/add-account"

export class AddAccountSpy implements AddAccount {
    account = mockAccountModel()
    params: AddAccountParams

    async add(params: AddAccountParams): Promise<AccountModel> {
        this.params = params
        return Promise.resolve(this.account)
    }

}