module.exports = [
    {
        name: 'default',
        type: 'mysql',
        host: 'valoremdb-staging.c5lrcb0vmqx9.ap-southeast-1.rds.amazonaws.com',
        port: 3306,
        username: 'admin',
        password: 'Password1',
        database: 'valoremdb',
        migrationsTableName: '_version',
        synchronize: true,
        migrations: ['db/migrations/**/*.ts'],
        cli: {
            migrationsDir: 'db/migrations'
        },
        entities: ['db/entities/**/*.{ts,js}']
    }
    // {
    //     name: 'local',
    //     type: 'mysql',
    //     host: '127.0.0.1',
    //     port: 3306,
    //     username: 'sail',
    //     password: 'password',
    //     database: 'digital_wallet',
    //     migrationsTableName: '_version',
    //     synchronize: true,
    //     migrations: ['db/migrations/**/*.ts'],
    //     cli: {
    //         migrationsDir: 'db/migrations'
    //     },
    //     entities: ['db/entities/**/*.{ts,js}']
    // }
];
