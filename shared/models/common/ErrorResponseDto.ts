import { ErrorCode } from '../../types/error/ErrorCodes';
export interface ErrorResponseDto {
    code: ErrorCode;
    shortDescription: string;
    data?: any;
}
