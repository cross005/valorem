import { CustomerInfoRequest } from './CustomerInfoRequest';

export interface CustomerVerification {
    username: string;
    code: number;
    userInfo: CustomerInfoRequest[];
}
