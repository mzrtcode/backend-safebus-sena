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

export const obtenerRuta = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query(`SELECT r.*, l1.nombre AS nombre_inicio, l2.nombre AS nombre_fin, l1.acronimo AS acronimo_inicio, l2.acronimo AS acronimo_fin
    FROM rutas AS r
    JOIN localidades AS l1 ON r.inicio_ruta = l1.id_localidad
    JOIN localidades AS l2 ON r.fin_ruta = l2.id_localidad
    WHERE r.id_ruta = ?`, [id])

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'No existe la ruta' })
    }

    res.status(200).json(resultado[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener la ruta' })
  }
}

export const eliminarRuta = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('DELETE FROM rutas WHERE id_ruta = ?', [id])

    if (resultado.affectedRows === 1) {
      res.status(204).json({ mensaje: 'Ruta eliminada' })
    } else {
      res.status(404).json({ mensaje: 'Ruta no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar la ruta' })
  }
}

export const actualizarRuta = async (req, res) => {
  const { id } = req.params
  const { inicio_ruta, fin_ruta, costo, estado } = req.body
  try {
    const [resultado] = await pool.query(
      'UPDATE rutas SET inicio_ruta = IFNULL(?, inicio_ruta), fin_ruta = IFNULL(?, fin_ruta), estado = IFNULL(?, estado), costo = IFNULL(?, costo) WHERE id_ruta = ?',
      [inicio_ruta, fin_ruta, estado, costo, id]
    )

    if (resultado.affectedRows === 1) {
      res.status(200).json({ mensaje: 'Ruta actualizada' })
    } else {
      res.status(404).json({ mensaje: 'Ruta no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar la ruta', error: error.message })
  }
}
