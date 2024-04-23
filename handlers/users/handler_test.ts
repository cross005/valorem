import { TransactionDataRequest } from 'shared/models/transaction/TransactionRequest';
import { getUserWallet, getUserTransactions } from './handler';
// import * as faker from 'faker';

test('200: SUCCESS USER WALLET', async () => {
    console.log('200: SUCCESS USER WALLET');
    const event: any = {
        pathParameters: {
            user_id: '449416d8-ec3c-4c0b-a326-e2cfaadaa3a6'
        }
    };

    const result = await getUserWallet(event);
    const response = JSON.parse(result.body!);

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');
    expect(result.statusCode).toBe(200);
    expect(response.code).toBe(200);
});

test('200: SUCCESS USER TRANSACTION', async () => {
    console.log('200: SUCCESS USER TRANSACTION');
    const event: any = {
        pathParameters: {
            user_id: '449416d8-ec3c-4c0b-a326-e2cfaadaa3a6'
        }
    };

    const result = await getUserTransactions(event);
    const response = JSON.parse(result.body!);

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('message');
    expect(result.statusCode).toBe(200);
    expect(response.code).toBe(200);
});
