import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import RemoteAuthentication from "./remote-authentication";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { HttpPostCode } from "@/data/protocols/http/http-response";
import { faker } from '@faker-js/faker';
import { UnexpectedError } from "@/domain/errors/unexpected-error";

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
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
            statusCode: HttpPostCode.unathorized
        }

        const promiseResult = sut.auth(mockAuthentication())

        await expect(promiseResult).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpPostCode.badRequest
        }

        const promiseResult = sut.auth(mockAuthentication())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpPostCode.serverError
        }

        const promiseResult = sut.auth(mockAuthentication())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpPostCode.notFound
        }

        const promiseResult = sut.auth(mockAuthentication())

        await expect(promiseResult).rejects.toThrow(new UnexpectedError())
    })
}) 