export interface TransactionDataRequest {
    transactions: TransactionRequest[];
}

export interface TransactionRequest {
    id: string;
    user_id: string;
    amount: string;
    description: string;
    type: string;
    type_method: string;
    state: string;
    user_name: string;
    currency: string;
    debit_credit: string;
    created_at: string;
    updated_at: string;
}
