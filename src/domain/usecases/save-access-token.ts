import { AccountModel } from "../model";

export interface UpdateCurrentAccount {
  save: (accessToken: AccountModel) => Promise<void>
}