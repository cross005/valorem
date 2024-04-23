import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BaseHandlerService } from '../BaseHandlerService';
import { UsersRepository } from '../../../db/repositories/UsersRepository';
import { PromiseErrorResponse } from '../../../common/models/ResponseError';
import { ErrorCode } from '../../../shared/types/error/ErrorCodes';
import { TransactionDataRequest, TransactionRequest } from '../../../shared/models/transaction/TransactionRequest';
import { TransactionRepository } from '../../../db/repositories/TransactionRepository';
import { PaymentResponse } from 'shared/models/payment/PaymentResponse';
import validators from '../../../services/validator';
import { Transaction } from '../../../db/entities/Transaction';
import { IMetadataHandlerService } from '../MetadataHandlerService';
import ioCTypes from '../../../ioc/ioCTypes';

export interface ITransactionHandlerService {
    paymentTransaction(connection: any, body: TransactionDataRequest): any;
}

@injectable()
export class TransactionHandlerService extends BaseHandlerService implements ITransactionHandlerService {
    private metadataHandlerService: IMetadataHandlerService;
    constructor(@inject(ioCTypes.IMetadataHandlerService) metadataHandlerService: IMetadataHandlerService) {
        super();
        this.metadataHandlerService = metadataHandlerService;
    }

    public paymentTransaction = async (connection: any, body: TransactionDataRequest): Promise<PaymentResponse> => {
        const validate = validators.paymentHandler.validatePayment(body.transactions[0]);
        if (validate.error) {
            return PromiseErrorResponse(ErrorCode.Common_ValidationError, 400, validate.error.details);
        }
        /**
         * Create user account
         */
        const userRepo = await connection.getCustomRepository(UsersRepository);
        const saveUser = await userRepo.saveUser(body.transactions[0]);
        const transBody: TransactionRequest = body.transactions[0];
        // For cents conversion amount / 100
        transBody.amount = (parseFloat(transBody.amount) * 100).toString();
        /**
         * Create transaction record
         */
        const data = {
            user_id: transBody.user_id,
            amount: transBody.amount,
            description: transBody.description,
            type: transBody.type,
            type_method: transBody.type_method,
            state: transBody.state,
            currency: transBody.currency,
            debit_credit: transBody.debit_credit
        };

        const transactionRepo = await connection.getCustomRepository(TransactionRepository);
        const saveTrans = await transactionRepo.createTransaction(data);
        return { user: saveUser, transaction: saveTrans };
    };
}
