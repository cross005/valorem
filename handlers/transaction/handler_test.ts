import { TransactionDataRequest } from 'shared/models/transaction/TransactionRequest';
import { paymentTransaction } from './handler';
// import * as faker from 'faker';

test('422: VADALIDATION ERROR', async () => {
    console.log('422: VADALIDATION ERROR');
    const event: any = {
        body: JSON.stringify(<TransactionDataRequest>{
            transactions: [
                {
                    id: '49f1cb10-0202-0138-225b-028e897a70a5',
                    user_id: '',
                    amount: '100.00',
                    description: 'Credit of $100.00 to Wallet Account by Debit of $100.00 from NPP Payin Funding Account',
                    type: 'deposit',
                    type_method: 'npp_payin',
                    state: 'successful',
                    user_name: 'Neol Buyer',
                    currency: 'AUD',
                    debit_credit: 'credit',
                    created_at: '2019-12-16T07:19:14.966Z',
                    updated_at: '2019-12-16T07:19:14.968Z'
                }
            ]
        })
    };

    const result = await paymentTransaction(event);
    const response = JSON.parse(result.body!);

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');

    expect(result.statusCode).toBe(400);
    expect(response.code).toBe(1);
});

test('200: SUCCESS PAYMENT', async () => {
    console.log('200: SUCCESS PAYMENT');
    const event: any = {
        body: JSON.stringify(<TransactionDataRequest>{
            transactions: [
                {
                    id: '49f1cb10-0202-0138-225b-028e897a70a5',
                    user_id: '449416d8-ec3c-4c0b-a326-e2cfaadaa3a6',
                    amount: '100.00',
                    description: 'Credit of $100.00 to Wallet Account by Debit of $100.00 from NPP Payin Funding Account',
                    type: 'deposit',
                    type_method: 'npp_payin',
                    state: 'successful',
                    user_name: 'Neol Buyer',
                    currency: 'AUD',
                    debit_credit: 'credit',
                    created_at: '2019-12-16T07:19:14.966Z',
                    updated_at: '2019-12-16T07:19:14.968Z'
                }
            ]
        })
    };

    const result = await paymentTransaction(event);
    const response = JSON.parse(result.body!);

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');
    expect(result.statusCode).toBe(200);
    expect(response.code).toBe(200);
});
