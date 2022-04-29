import AccountModel from '../model/account-model';

interface AuthParams {
    email: string;
    password: string
}

export interface Authentication {
    auth (params: AuthParams): Promise<AccountModel>
}