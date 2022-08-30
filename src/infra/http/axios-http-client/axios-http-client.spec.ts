import axios from "axios"
import { mockGetRequest, mockPostRequest } from "@/data/test"
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
    describe('Post', () => {
        test('Should call axios.post with correct URL, BODY and verb', async () => {
            const request = mockPostRequest()
            const { mockedAxios, sut } = makeSut()
            await sut.post(request)
            expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
        })
    
        test('Should return correct response on axios.post', async () => {
            const { mockedAxios, sut } = makeSut()
            const httpRespone = await sut.post(mockPostRequest())
            const axiosResponse = await mockedAxios.post.mock.results[0].value
            expect(httpRespone).toEqual({
                statusCode: axiosResponse.status,
                body: axiosResponse.data
            })
        })
    
        test('Should return correct error on axios.post', () => {
            const { sut, mockedAxios } = makeSut()
            mockedAxios.post.mockRejectedValueOnce({
                response: mockHttpResponse()
            })
            const httpResponsePromise = sut.post(mockPostRequest())
            expect(httpResponsePromise).toEqual(mockedAxios.post.mock.results[0].value)
        })
    })

    describe('get', () => {
        test('Should call axios.post with correct URL, BODY and verb', async () => {
            const request = mockGetRequest()
            const { mockedAxios, sut } = makeSut()
            await sut.get(request)
            expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
        })

        test('Should return correct response on axios.get', async () => {
            const { mockedAxios, sut } = makeSut()
            const httpRespone = await sut.get(mockGetRequest())
            const axiosResponse = await mockedAxios.get.mock.results[0].value
            expect(httpRespone).toEqual({
                statusCode: axiosResponse.status,
                body: axiosResponse.data
            })
        })
    })
})