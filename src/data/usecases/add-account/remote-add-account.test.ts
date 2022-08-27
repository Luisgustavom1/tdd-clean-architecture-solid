import { faker } from '@faker-js/faker';

import { RemoteAddAccount } from "./remote-add-account";
import { HttpPostClientSpy } from "@/data/test";
import { UnexpectedError } from "@/domain/errors";
import { HttpPostCode } from "@/data/protocols/http";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { AccountModel } from "@/domain/model";
import { mockAddAccount, mockAccountModel } from '@/domain/test/mock-add-account';

type SutTypes = {
    sut: RemoteAddAccount
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
    const sut = new RemoteAddAccount(url, httpPostClientSpy)

    return {
        sut,
        httpPostClientSpy,
    }
}

describe('Remote Add Account', () => {
    test('Should call HttPostClient with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)

        await sut.add(mockAddAccount())

        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttPostClient with correct body', async () => {
        const url = faker.internet.url()
        const addAccountParams = mockAddAccount()
        const { sut, httpPostClientSpy } = makeSut(url)

        await sut.add(addAccountParams)

        expect(httpPostClientSpy.body).toEqual(addAccountParams)
    })

    test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpPostCode.unathorized
        }

        const promiseResult = sut.add(mockAddAccount())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpPostCode.badRequest
        }

        const promiseResult = sut.add(mockAddAccount())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpPostCode.serverError
        }

        const promiseResult = sut.add(mockAddAccount())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpPostCode.notFound
        }

        const promiseResult = sut.add(mockAddAccount())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })

    test('Should an AccoutModel if HttpPostClient returns 200', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const httpResult = mockAccountModel()
        httpPostClientSpy.response = {
            statusCode: HttpPostCode.ok,
            body: httpResult
        }

        const account = await sut.add(mockAddAccount())

        expect(account).toEqual(httpResult)
    })
}) 