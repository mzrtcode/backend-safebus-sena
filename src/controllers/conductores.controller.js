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

export const crearConductor = async (req, res) => {
  try {
    const { nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion } = req.body

    const [resultado] = await pool.query(
      'INSERT INTO conductores (nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion]
    )
    const conductorCreado = {
      id: resultado.insertId, // Obtener el ID generado por la base de datos
      nombres,
      apellidos,
      tipo_identificacion,
      numero_identificacion,
      correo,
      celular,
      fecha_nacimiento,
      direccion
    }

    res.status(201).json(conductorCreado)
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al crear el conductor' })
  }
}

export const obtenerConductor = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('SELECT * FROM conductores WHERE id_conductor = ?', [id])

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'No existe el conductor' })
    }

    res.status(200).json(resultado[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener el conductor' })
  }
}

export const eliminarConductor = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('DELETE FROM conductores WHERE id_conductor = ?', [id])

    if (resultado.affectedRows === 1) {
      res.status(204).json({ mensaje: 'Conductor eliminada' })
    } else {
      res.status(404).json({ mensaje: 'Conductor no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar el conductor' })
  }
}

export const actualizarConductor = async (req, res) => {
  const { id } = req.params
  const { nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion } = req.body
  try {
    const [resultado] = await pool.query(
      'UPDATE conductores SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), tipo_identificacion = IFNULL(?, tipo_identificacion), numero_identificacion = IFNULL(?, numero_identificacion), correo = IFNULL(?, correo), celular = IFNULL(?, celular), fecha_nacimiento = IFNULL(?, fecha_nacimiento), direccion = IFNULL(?, direccion) WHERE id_ruta = ?',
      [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, id]
    )

    if (resultado.affectedRows === 1) {
      res.status(200).json({ mensaje: 'Conductor actualizada' })
    } else {
      res.status(404).json({ mensaje: 'Conductor no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar la conductor', error: error.message })
  }
}
