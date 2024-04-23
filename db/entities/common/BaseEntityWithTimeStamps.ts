import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntityWithTimeStamps extends BaseEntity {
    // @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' }) createdAt: Date;
    // @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' }) updatedAt: Date;
}
