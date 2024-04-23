import { ResponseError } from '@common/models/ResponseError';
import { ErrorCode } from '../../shared/types/error/ErrorCodes';
import { injectable } from 'inversify';
import { Connection } from 'typeorm';

@injectable()
export class BaseHandlerService {
    async utilities(): Promise<any> {}
}
