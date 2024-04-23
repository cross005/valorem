export interface PaymentResponse {
    user: UserReponse;
    transaction: TransactionResponse;
}

interface UserReponse {
    id: string;
    wallet: number;
}

interface TransactionResponse {
    id: string;
    user_id: number;
    amount: string;
}
