import { Column, Entity, Index, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntityWithTimeStamps } from './common/BaseEntityWithTimeStamps';
import { v4 as uuidv4 } from 'uuid';
import { Users } from './Users';

@Entity('transactions')
export class Transaction extends BaseEntityWithTimeStamps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false }) user_id: string;
    @Column({ nullable: false, type: 'int', default: 0 }) amount: string;
    @Column({ nullable: false }) type: string;
    @Column({ nullable: false }) type_method: string;
    @Column({ nullable: false }) state: string;
    @Column({ nullable: false }) description: string;
    @Column({ nullable: false }) currency: string;
    @Column({ nullable: false }) debit_credit: string;

    // @ManyToOne(() => Users, (users) => users.transaction) users?: Users;
}
