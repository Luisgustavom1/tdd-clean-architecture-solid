import { AccountModel } from '@/domain/model/account-model';

export interface Authentication {
    auth(params: Authentication.Params): Promise<Authentication.Model>
}

export namespace Authentication {
    export type Params = {
        email: string;
        password: string
    }

    export type Model = AccountModel
}