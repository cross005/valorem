import { DeepPartial, EntityRepository, Repository } from 'typeorm';
import { TransactionRequest } from '../../shared/models/transaction/TransactionRequest';
import { Users } from '../../db/entities/Users';
import { Transaction } from '../../db/entities/Transaction';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    public async saveUser(body: TransactionRequest): Promise<Users> {
        const rec = await this.findOne({
            where: {
                id: body.user_id
            }
        });

        let wallet: string;
        const amount = Math.round(parseFloat(body.amount) * 100).toString();
        if (rec) {
            wallet = rec.wallet + Math.round(parseFloat(body.amount) * 100);
        } else {
            wallet = amount;
        }

        const entity = this.merge(new Users(), { id: body.user_id, wallet: wallet, user_name: body.user_name });
        return await this.save(entity);
    }

    public async findWalletByUserId(user_id: string): Promise<Users | undefined> {
        const rec = await this.findOne({
            where: {
                id: user_id
            }
        });
        return rec;
    }

    public async findUserTransactions(connection: any, user_id: string): Promise<any> {
        const rec = await connection
            .createQueryBuilder(Transaction, 'transactions')
            .select(['transactions.id as id', 'transactions.user_id as user_id', 'transactions.amount as amount'])
            .where('transactions.user_id = :user_id', { user_id: user_id })
            .getRawMany();

        return rec;
    }
}
