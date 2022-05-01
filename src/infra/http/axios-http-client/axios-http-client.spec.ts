import { HttpPostParams } from "@/data/protocols/http"
import faker from "@faker-js/faker"
import axios from "axios"
import { AxiosHttpClient } from "./axios-http-client"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}

const makePostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement({
        email: 'email',
    })
})

describe('AxiosHttpClient', () => {
    test('Should call axios with correct URL, BODY and verb', async () => {
        const request = makePostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should retur', async () => {
        const request = makePostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })
})