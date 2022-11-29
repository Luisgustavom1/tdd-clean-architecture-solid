import { GetStorage } from '@/data/protocols/cache'
import { SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
      return
    }

    localStorage.removeItem(key)
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
