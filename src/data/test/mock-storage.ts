import { SetStorage } from "../protocols/cache/set-storage"

export class SetStorageSpy implements SetStorage {
  key: string
  value: any

  async set(key: string, value: never): Promise<void> {
    this.key = key
    this.value = value
  }
}