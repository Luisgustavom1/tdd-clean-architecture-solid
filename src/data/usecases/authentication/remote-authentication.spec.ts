import { faker } from '@faker-js/faker';

import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/test";
import { mockAuthenticationModel, mockAuthentication } from "@/domain/test";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http";
import { Authentication } from "@/domain/usecases/authentication";
import { RemoteAddAccount } from '../add-account/remote-add-account';

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy<Authentication.Params, RemoteAddAccount.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<Authentication.Params, RemoteAddAccount.Model>()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    return {
        sut,
        httpPostClientSpy,
    }
}

describe('Remote Authentication', () => {
    test('Should call HttPostClient with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)

        await sut.auth(mockAuthentication())

        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttPostClient with correct body', async () => {
        const url = faker.internet.url()
        const authenticationParams = mockAuthentication()
        const { sut, httpPostClientSpy } = makeSut(url)

        await sut.auth(authenticationParams)

        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })

    test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unathorized
        }

        const promiseResult = sut.auth(mockAuthentication())

        await expect(promiseResult).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }

        const promiseResult = sut.auth(mockAuthentication())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }

        const promiseResult = sut.auth(mockAuthentication())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }

        const promiseResult = sut.auth(mockAuthentication())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })

    test('Should an AccoutModel if HttpPostClient returns 200', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const httpResult = mockAuthenticationModel()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }

        const account = await sut.auth(mockAuthentication())

        expect(account).toEqual(httpResult)
    })
}) 