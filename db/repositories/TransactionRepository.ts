import { Transaction } from '../../db/entities/Transaction';
import { TransactionResponse } from '../../shared/models/transaction/TransactionResponse';
import { DeepPartial, EntityRepository, Repository } from 'typeorm';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
    public getTransactionById = async (id: string) => {
        return await this.findOneOrFail({
            where: { id }
        });
    };

    public async createTransaction(transaction: DeepPartial<Transaction>): Promise<TransactionResponse> {
        const entity = this.merge(new Transaction(), transaction);
        return await this.save(entity);
    }
}
