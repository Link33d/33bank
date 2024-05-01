export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
}

export interface HttpResponse<T> {
    statusCode: HttpStatusCode;
    body: T;
}

export const ok = <T>(body: any): HttpResponse<T> => ({
    statusCode: HttpStatusCode.OK,
    body,
});
  
export const badRequest = (message: string): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: message,
    };
};
  
  export const serverError = (): HttpResponse<string> => {
    return {
      statusCode: HttpStatusCode.SERVER_ERROR,
      body: "Something went wrong",
    };
  };