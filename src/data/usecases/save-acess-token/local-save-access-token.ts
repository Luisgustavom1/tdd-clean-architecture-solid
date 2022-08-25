import { SetStorage } from "@/data/protocols/cache/set-storage";
import { SaveAccesssToken } from "@/domain/usecases/save-access-token";

export class LocalSaveAccessToken implements SaveAccesssToken {
  constructor (private readonly setStorage: SetStorage) {}

  async save (accessToken: string): Promise<void> {
    this.setStorage.set('accessToken', accessToken)
  }
}