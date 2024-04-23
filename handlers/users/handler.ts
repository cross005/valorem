import { BadResponseWithCode, OK } from '../../common/models/responses';
import { HttpEventRequest, HttpEventRequestBodyPathParams, parseBody } from '../../common/types';
import container from '../../ioc/container';
import ioCTypes from '../../ioc/ioCTypes';
import { Context } from 'aws-lambda';
import { Router } from '../router';
import { MysqlDatabase } from '../../db/MysqlDatabase';
import 'mysql';
import { IUserHandlerService } from '../../services/handler/user/UserHandlerService';

const userHandlerService = container.get<IUserHandlerService>(ioCTypes.IUserHandlerService);

export const handleUserData = async (event: HttpEventRequest, context: Context) => {
    const router = new Router(event, context);
    router.register('GET', 'user/{user_id}/wallet', getUserWallet);
    router.register('GET', 'user/{user_id}/transactions', getUserTransactions);
    return await router.route();
};

export const getUserWallet = async (event: any) => {
    try {
        const user_id = String(event.pathParameters.user_id);
        const connection = await MysqlDatabase.getConnection();
        const user = await userHandlerService.getWallet(connection, user_id);
        return OK(user, 200, 'User Wallet', 'getUserWallet', false);
    } catch (error) {
        return BadResponseWithCode(error);
    }
};

export const getUserTransactions = async (event: any) => {
    try {
        const user_id = String(event.pathParameters.user_id);
        const connection = await MysqlDatabase.getConnection();
        const userTransaction = await userHandlerService.getUserTransactions(connection, user_id);
        return OK(userTransaction, 200, 'User Transactions', 'getUserTransactions', false);
    } catch (error) {
        return BadResponseWithCode(error);
    }
};
