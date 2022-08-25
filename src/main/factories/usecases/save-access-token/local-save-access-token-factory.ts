import { LocalSaveAccessToken } from "@/data/usecases/save-acess-token/local-save-access-token";
import { SaveAccesssToken } from "@/domain/usecases";
import { makeLocalStorageAdapter } from "@/main/factories/cache/local-storage-adapter-factory";

export const makeLocalSaveAccessToken = (): SaveAccesssToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}