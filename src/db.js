import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

pool.getConnection()
  .then(connection => {
    console.log(':: Conectado a la base de datos ::')
    connection.release()
  })
  .catch(err => {
    console.error('Error al conectarse a la base de datos:', err)
  })
