import { pool } from '../db.js'

// Función que maneja la solicitud para obtener todas las rutas
export const obtenerRutas = async (req, res) => {
  try {
    const [resultado] = await pool.query(`SELECT r.*, l1.nombre AS nombre_inicio, l2.nombre AS nombre_fin, l1.acronimo AS acronimo_inicio, l2.acronimo AS acronimo_fin
    FROM rutas AS r
    JOIN localidades AS l1 ON r.inicio_ruta = l1.id_localidad
    JOIN localidades AS l2 ON r.fin_ruta = l2.id_localidad;
    `)
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener las rutas' })
  }
}

export const crearRuta = async (req, res) => {
  try {
    const { inicio_ruta, fin_ruta, costo } = req.body
    const [resultado] = await pool.query('INSERT INTO rutas (inicio_ruta, fin_ruta, costo) VALUES (?,?,?)', [inicio_ruta, fin_ruta, costo])

    const rutaCreada = {
      id: resultado.insertId, // Obtener el ID generado por la base de datos
      inicio_ruta,
      fin_ruta,
      costo
    }

    res.status(201).json(rutaCreada)
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al crear la ruta' })
  }
}
