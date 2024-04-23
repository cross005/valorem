import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1713744343193 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) NOT NULL,
                user_name CHAR(40) NOT NULL,
                wallet int DEFAULT 0,
                created_at DATETIME NOT NULL DEFAULT NOW(),
                updated_at DATETIME NOT NULL DEFAULT NOW(),
                deleted_at DATETIME NULL,
                CONSTRAINT users_pkey PRIMARY KEY (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users`);
    }
}
