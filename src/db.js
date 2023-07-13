import { createPool } from 'mysql2/promise';

export let pool;

try {
    pool = new createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    })
    console.log(':: Conectado a la base de datos ::');

} catch (error) {
    console.error('Error al conectarse a la base de datos:', error);
}
