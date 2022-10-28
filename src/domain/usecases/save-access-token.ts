import { AccountModel } from "../model";

export interface UpdateCurrentAccount {
  save: (accessToken: UpdateCurrentAccount.Params) => Promise<void>
}

export namespace UpdateCurrentAccount {
  export type Params = AccountModel
}