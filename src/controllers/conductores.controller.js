import { pool } from '../db.js'

// Función que maneja la solicitud para obtener todas los conductores
export const obtenerConductores = async (req, res) => {
  try {
    const [resultado] = await pool.query('SELECT * FROM conductores')
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener las conductores' })
  }
}
