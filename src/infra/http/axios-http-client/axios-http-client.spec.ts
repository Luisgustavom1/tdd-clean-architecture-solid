import axios from "axios"
import { makePostRequest } from "@/data/test"
import { mockAxios } from "../test"
import { AxiosHttpClient } from "./axios-http-client"

jest.mock('axios')

type SutTypes = {
    sut: AxiosHttpClient
    mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
    const sut = new AxiosHttpClient()
    const mockedAxios = mockAxios()

    return {
        sut,
        mockedAxios
    }
}

describe('AxiosHttpClient', () => {
    test('Should call axios with correct URL, BODY and verb', async () => {
        const request = makePostRequest()
        const { mockedAxios, sut } = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct statusCode and body', () => {
        const { sut, mockedAxios } = makeSut()
        const httpResponsePromise = sut.post(makePostRequest())
        expect(httpResponsePromise).toEqual(mockedAxios.post.mock.results[0].value)
    })
})