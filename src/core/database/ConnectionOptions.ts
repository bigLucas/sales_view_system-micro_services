/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConnectionOptions } from 'typeorm';
import { env } from '../../env/env';

export const connectionOptions: ConnectionOptions = {
    type: env.database.type as any,
    host: env.database.host,
    port: env.database.port,
    username: env.database.username,
    password: env.database.password,
    database: env.database.database,
    synchronize: env.database.synchronize,
    logging: env.database.logging,
    entities: env.database.entities,
    migrations: env.database.migrations,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    cli: {
        entitiesDir: env.database.entitiesDir,
        migrationsDir: env.database.migrationsDir,
    },
};
