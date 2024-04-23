import { injectable } from 'inversify';
import 'reflect-metadata';
import { BaseHandlerService } from './BaseHandlerService';

export interface IMetadataHandlerService {
    getHMACValue(token, body): Promise<any>;
    // generateHMAC(data: any, secret: any): Promise<any>;
}

const crypto = require('crypto');
const secret = '4e8ed8cb73ab6a502d02825a2912e2313a3ea7b3a9e88336083d28984de2605d';
@injectable()
export class MetadataHandlerService extends BaseHandlerService implements IMetadataHandlerService {
    constructor() {
        super();
    }

    public getHMACValue = async (token, data): Promise<any> => {
        const hmacSignature = await this.generateHMAC(data, secret);

        console.log('Token', token, hmacSignature);

        if (token === hmacSignature) {
            console.log('Success');
        } else {
            console.log('Failed');
        }
    };

    private generateHMAC = async (data: any, secret: any): Promise<any> => {
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(JSON.stringify(data));
        return hmac.digest('hex');
    };
}
