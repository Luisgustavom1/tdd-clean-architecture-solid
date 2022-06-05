import { AccountModel } from "@/domain/model"
import { mockAccountModel } from "@/domain/test"
import { Authentication, AuthenticationParams } from "@/domain/usecases"

class AuthenticationSpy implements Authentication {
    account = mockAccountModel()
    params: AuthenticationParams
    callsCount = 0

    auth(params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        this.callsCount += 1
        return Promise.resolve(this.account)
    }

}

export default AuthenticationSpy