export enum HttpPostCode {
    noContent = 204,
    unathorized = 401
}

export type HttpResponse = {
    statusCode: HttpPostCode
    body?: any
}