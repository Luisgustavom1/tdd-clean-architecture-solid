import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import RemoteAuthentication from "./remote-authentication";

describe('Remote Authentication', () => {
    it('Should call HttPostClient with correct URL', async () => {
        const url = 'my_url'
        const httpPostClient = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClient)

        sut.auth()

        expect(httpPostClient.url).toBe(url)
    })
}) 