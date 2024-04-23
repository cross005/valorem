import { APIGatewayProxyResult, APIGatewayProxyWithLambdaAuthorizerEvent } from 'aws-lambda';

export type HttpEventRequest = APIGatewayProxyWithLambdaAuthorizerEvent<{ principalId: string }>;

export type HttpEventRequestPathParams<TPathParams = null> = Omit<HttpEventRequest, 'pathParameters'> & {
    pathParameters: TPathParams;
};

export type HttpEventRequestBody<TBody = any | null> = Omit<HttpEventRequest, 'body'> & {
    body: TBody;
};

export type HttpEventRequestBodyPathParams<TPathParams = null, TBody = any | null> = Omit<HttpEventRequest, 'pathParameters,body'> & {
    pathParameters: TPathParams;
    body: TBody;
};
export type HttpResponse = Promise<APIGatewayProxyResult>;

export function parseBody<T>(request: HttpEventRequestBody<T> | HttpWithClaimsEventRequestBody<T>) {
    return JSON.parse(String(request.body)) as T;
}

export type HttpWithClaimsEventRequest = APIGatewayProxyWithLambdaAuthorizerEvent<{ principalId: string; venueId: number; roleId: number }>;

export type HttpWithClaimsEventRequestPathParams<TPathParams = null> = Omit<HttpWithClaimsEventRequest, 'pathParameters'> & {
    pathParameters: TPathParams;
};

export type HttpWithClaimsEventRequestBody<TBody = any | null> = Omit<HttpWithClaimsEventRequest, 'body'> & {
    body: TBody;
};

export type HttpWithClaimsEventRequestBodyPathParams<TPathParams = null, TBody = any | null> = Omit<
    HttpWithClaimsEventRequest,
    'pathParameters,body'
> & {
    pathParameters: TPathParams;
    body: TBody;
};
