import { SetStorage } from "@/data/protocols/cache/set-storage";
import { UnexpectedError } from "@/domain/errors";
import { SaveAccesssToken } from "@/domain/usecases/save-access-token";

export class LocalSaveAccessToken implements SaveAccesssToken {
  constructor (private readonly setStorage: SetStorage) {}

  async save (accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new UnexpectedError()
    }
    this.setStorage.set('accessToken', accessToken)
  }
}