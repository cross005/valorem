import Joi from 'joi';
import { TransactionRequest } from 'shared/models/transaction/TransactionRequest';

const validatePayment = (data: TransactionRequest): Joi.ValidationResult => {
    const schema = Joi.object<TransactionRequest>({
        id: Joi.string().optional(),
        user_id: Joi.string().required(),
        amount: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().required(),
        type_method: Joi.string().required(),
        state: Joi.string().required(),
        user_name: Joi.string().required(),
        currency: Joi.string().required(),
        debit_credit: Joi.string().required(),
        created_at: Joi.string().optional(),
        updated_at: Joi.string().optional()
    });

    return schema.validate(data);
};

export default {
    validatePayment
};
