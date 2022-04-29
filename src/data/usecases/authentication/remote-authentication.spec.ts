import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import RemoteAuthentication from "./remote-authentication";

describe('Remote Authentication', () => {
    it('Should call HttPostClient with correct URL', async () => {
        class HttpPostClientSpy implements HttpPostClient {
            url?: string;
            async post(url: string) {
                this.url = url

                return Promise.resolve()
            }
        }
        const url = 'my_url'
        const httpPostClient = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClient)

        sut.auth()

        expect(httpPostClient.url).toBe(url)
    })
}) 