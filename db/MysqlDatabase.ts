import { Connection, createConnection } from 'typeorm';
import { injectable } from 'inversify';
import { Users } from './entities/Users';
import { Transaction } from './entities/Transaction';
export enum Dialect {
    mysql = 'mysql',
    pgsql = 'postgres'
}

export interface DBConnection {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    dialect?: Dialect;
    name?: string;
    entities?: any[];
    logging?: string[];
}

interface ActiveConnections {
    [key: string]: Connection;
}

const entities = [Users, Transaction];

const connection: DBConnection = {
    host: process.env.MYSQLHOST ?? '127.0.0.1',
    port: parseInt(process.env.MYSQLPORT!) ?? 3306,
    username: process.env.MYSQLUSER! ? process.env.MYSQLUSER! : 'root',
    password: process.env.MYSQLPASSWORD! ? process.env.MYSQLPASSWORD! : '',
    database: process.env.MYSQLDATABASE! ? process.env.MYSQLDATABASE! : 'serverless',
    dialect: Dialect.mysql,
    entities: entities
};

let active: ActiveConnections = {};

@injectable()
export class MysqlDatabase {
    protected static dialect = Dialect.mysql;
    protected static schema = 'public';
    protected static conn = 'local';
    protected static connection: DBConnection = connection;

    static async getConnection(name?: string, config?: DBConnection): Promise<Connection> {
        const conn = name ?? this.conn;

        try {
            if (typeof active[conn] === 'undefined') {
                config = config ?? this.connection;
                config.dialect = this.dialect;
                config.entities = entities;
                const connection = {
                    name: conn,
                    type: config.dialect,
                    host: config.host,
                    port: config.port,
                    username: config.username,
                    password: config.password,
                    database: config.database,
                    entities: config.entities,
                    timezone: '+08:00',
                    dateStrings: ['DATETIME'],
                    charset: 'utf8mb4_unicode_ci',
                    logging: false
                };
                const { name, type, host, database } = connection;
                let schema = '';

                if (connection.type === 'postgres') {
                    schema = this.schema;
                    connection['schema'] = this.schema;
                }

                active[conn] = await createConnection(connection);
            }
        } catch (error) {
            console.log('Database Error Connection', JSON.stringify(error));
            throw error;
        }

        return active[conn];
    }

    static async closeConnection(): Promise<void> {
        const closing: Array<Promise<void>> = [];

        for (const key in active) {
            if (active.hasOwnProperty(key)) {
                const connection: Connection = active[key];
                closing.push(connection.close());
            }
        }

        active = {};

        await Promise.all(closing);
    }
}
