import { ErrorCode } from '../../shared/types/error/ErrorCodes';

export class ResponseError extends Error {
    constructor(code: ErrorCode, statusCode?: 400 | 401 | 500, data?: any) {
        const message = `${ErrorCode[code]}`.split('_')[1].replace(/([a-z](?=[A-Z]))/g, '$1 ');
        super(message);
        this.errorCode = code;
        this.data = data;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    errorCode: ErrorCode;
    data?: any;
    statusCode?: number;
}

export const PromiseErrorResponse = (code: ErrorCode, statusCode?: 400 | 500, data?: any) =>
    Promise.reject(new ResponseError(code, statusCode, data));
