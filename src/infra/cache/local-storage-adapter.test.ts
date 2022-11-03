import { mockAccountModel } from "@/domain/test"
import { faker } from "@faker-js/faker"
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from "./local-storage-adapter"

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('Should call localStorag.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = mockAccountModel()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
  it('Should call localStorag.removeItem if value is null', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = mockAccountModel()
    sut.set(key, undefined)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })
  it('Should call localStorag.getItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = mockAccountModel()
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})