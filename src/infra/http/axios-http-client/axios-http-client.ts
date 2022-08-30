import { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any>, HttpGetClient {
    async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
        let axiosResponse: AxiosResponse<any>

        try {
            axiosResponse = await axios.post(params.url, params.body)

        } catch (error) {
            axiosResponse = error.response;
        }

        return {
            body: axiosResponse.data,
            statusCode: axiosResponse.status,
        }
    }

    async get (params: HttpGetParams): Promise<HttpResponse> {
        const axiosResponse = await axios.get(params.url)
        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data
        };
    }
}