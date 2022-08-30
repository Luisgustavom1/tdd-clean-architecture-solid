import axios from "axios"
import { makePostRequest } from "@/data/test"
import { mockAxios, mockHttpResponse } from "../../test"
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
    test('Should call axios.post with correct URL, BODY and verb', async () => {
        const request = makePostRequest()
        const { mockedAxios, sut } = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct response on axios.post', () => {
        const { sut, mockedAxios } = makeSut()
        const httpResponsePromise = sut.post(makePostRequest())
        expect(httpResponsePromise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('Should return correct error on axios.post', () => {
        const { sut, mockedAxios } = makeSut()
        mockedAxios.post.mockRejectedValueOnce({
            response: mockHttpResponse()
        })
        const httpResponsePromise = sut.post(makePostRequest())
        expect(httpResponsePromise).toEqual(mockedAxios.post.mock.results[0].value)
    })
})