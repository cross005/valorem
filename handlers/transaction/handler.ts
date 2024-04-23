import { BadResponseWithCode, OK } from '../../common/models/responses';
import { HttpEventRequest, HttpEventRequestBodyPathParams, parseBody } from '../../common/types';
import container from '../../ioc/container';
import ioCTypes from '../../ioc/ioCTypes';
import { ITransactionHandlerService } from '../../services/handler/transaction/TransactionHandlerService';
import { Context } from 'aws-lambda';
import { Router } from '../router';
import { TransactionDataRequest, TransactionRequest } from '../../shared/models/transaction/TransactionRequest';
import { MysqlDatabase } from '../../db/MysqlDatabase';
import 'mysql';

const transactionHandlerService = container.get<ITransactionHandlerService>(ioCTypes.ITransactionHandlerService);

export const handleCustomersTransactionData = async (event: HttpEventRequest, context: Context) => {
    const router = new Router(event, context);
    router.register('POST', 'webhook/payment', paymentTransaction);
    return await router.route();
};

export const paymentTransaction = async (event: any) => {
    try {
        const connection = await MysqlDatabase.getConnection();
        const body: TransactionDataRequest = parseBody(event);
        const transaction = await transactionHandlerService.paymentTransaction(connection, body);
        return OK(transaction, 200, 'Success Payment', 'paymentTransaction', false);
    } catch (error) {
        return BadResponseWithCode(error);
    }
};
