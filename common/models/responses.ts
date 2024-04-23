import { ErrorResponseDto } from '../../shared/models/common/ErrorResponseDto';
import { ResponseError } from './ResponseError';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE,HEAD',
    'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
};

export const OK = (body?: any, code?: number, message?: string, functionName?: string, enableLogs?: boolean) => {
    let response = {
        code: code ?? 200,
        message: message ?? null,
        data: body
    };
    const bodyResponse = response ? JSON.stringify(response) : null;

    if (enableLogs) {
        console.info(functionName + ' | Success.Response: ', bodyResponse ?? '' + 'Success.Response: ', bodyResponse);
    }

    return {
        statusCode: 200,
        headers,
        body: bodyResponse
    };
};

export const BadResponse = (body?: object | string, statusCode?: number) => {
    console.error('Error.Response: ', body);
    return {
        headers,
        statusCode: statusCode ? statusCode : 500,
        body: body ? (typeof body === 'object' ? JSON.stringify(body) : body) : null
    };
};

export const BadResponseWithCode = (error: any, code?: number, message?: string, functionName?: string, enableLogs?: boolean) => {
    if (enableLogs) {
        console.error(functionName + ' | Error.Response: ', error ?? '' + 'Error.Response: ', error);
    }

    if (error instanceof ResponseError) {
        let errorResponse = {
            code: error.errorCode,
            message: error.message,
            data: error.data
        };
        const errorResponses = JSON.stringify(errorResponse);

        return {
            headers: headers,
            statusCode: error.statusCode ?? 400,
            body: errorResponses
        };
    }

    let errorResponse = {
        code: code,
        message: message,
        data: error.data
    };

    const errorRes = JSON.stringify(errorResponse);

    return {
        headers: headers,
        statusCode: 400,
        body: errorRes
    };
};
