import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionTable1713775079580 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS transactions (
                id CHAR(36) NOT NULL,
                user_id CHAR(36) NOT NULL,
                amount VARCHAR(255) DEFAULT 0,
                type CHAR(20) NOT NULL,
                type_method CHAR(20) NOT NULL,
                state CHAR(20) NOT NULL,
                description TEXT NOT NULL,
                currency CHAR(20) NOT NULL,
                debit_credit CHAR(20) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT NOW(),
                updated_at DATETIME NOT NULL DEFAULT NOW(),
                deleted_at DATETIME NULL,
                CONSTRAINT transactions_pkey PRIMARY KEY (id),
                CONSTRAINT transactions_user_id_foreign FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE transactions`);
    }
}
