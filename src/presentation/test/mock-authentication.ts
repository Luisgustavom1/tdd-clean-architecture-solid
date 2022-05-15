import { AccountModel } from "@/domain/model"
import { mockAccountModel } from "@/domain/test"
import { Authentication, AuthenticationParams } from "@/domain/usecases"

class AuthenticationSpy implements Authentication {
    account = mockAccountModel()
    params: AuthenticationParams

    auth(params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        return Promise.resolve(this.account)
    }

}

export default AuthenticationSpy