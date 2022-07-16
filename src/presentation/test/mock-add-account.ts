import { AccountModel } from "@/domain/model"
import { mockAccountModel } from "@/domain/test"
import { AddAccount, AddAccountParams } from "@/domain/usecases/add-account"

export class AddAccountSpy implements AddAccount {
    account = mockAccountModel()
    params: AddAccountParams
    callsCount = 0
    
    async add(params: AddAccountParams): Promise<AccountModel> {
        this.params = params
        this.callsCount += 1
        return Promise.resolve(this.account)
    }

}