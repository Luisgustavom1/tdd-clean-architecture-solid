import { faker } from "@faker-js/faker"
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from "./local-storage-adapter"


describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('Should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.words()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})