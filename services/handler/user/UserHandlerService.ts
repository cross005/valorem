import { injectable } from 'inversify';
import 'reflect-metadata';
import { BaseHandlerService } from '../BaseHandlerService';
import { UsersRepository } from '../../../db/repositories/UsersRepository';
import validators from '../../validator';
import { Transaction } from '../../../db/entities/Transaction';
import { UserWalletResponse } from 'shared/models/user/UserWalletResponse';
import { UserTransactionsResponse } from 'shared/models/user/UserTransactionsResponse';

export interface IUserHandlerService {
    getWallet(connection: any, user_id: string): any;
    getUserTransactions(connection: any, user_id: string): any;
}

@injectable()
export class UserHandlerService extends BaseHandlerService implements IUserHandlerService {
    constructor() {
        super();
    }

    public getWallet = async (connection: any, user_id: string): Promise<UserWalletResponse> => {
        const userRepo = await connection.getCustomRepository(UsersRepository);
        return await userRepo.findWalletByUserId(user_id);
    };

    public getUserTransactions = async (connection: any, user_id: string): Promise<UserTransactionsResponse> => {
        const userRepo = await connection.getCustomRepository(UsersRepository);
        return await userRepo.findUserTransactions(connection, user_id);
    };
}
