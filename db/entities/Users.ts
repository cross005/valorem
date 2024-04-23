import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityWithTimeStamps } from './common/BaseEntityWithTimeStamps';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from './Transaction';

@Entity('users')
export class Users extends BaseEntityWithTimeStamps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false }) user_name: string;
    @Column({ nullable: false, type: 'int', default: 0 }) wallet: string;

    // @OneToMany(() => Transaction, (transaction) => transaction.users) transaction?: Transaction;
}
