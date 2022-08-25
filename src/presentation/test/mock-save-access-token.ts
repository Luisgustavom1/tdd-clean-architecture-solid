import { SaveAccesssToken } from "@/domain/usecases/save-access-token"
import { Validation } from "../protocols/validations"

export class SaveAccessTokenMock implements SaveAccesssToken {
  accessToken: string
  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
}
