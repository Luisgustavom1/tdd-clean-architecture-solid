import { UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/model";
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-adapter-factory";

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }

  makeLocalStorageAdapter().set("account", account);
}

export const getCurrentAccountAdapter = (): void => {
  return makeLocalStorageAdapter().get("account");
}