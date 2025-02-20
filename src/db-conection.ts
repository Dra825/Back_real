import { Pool } from 'pg';

const pool = new Pool ({

    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432, //Default Postgress port
    database: 'Juego'
});

export function query(text: any): any {
    return pool.query(text);
}