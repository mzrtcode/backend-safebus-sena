import { pool } from '../db.js'

// Función que maneja la solicitud para obtener todas los propietarios
export const obtenerPropietarios = async (req, res) => {
  try {
    const [resultado] = await pool.query('SELECT * FROM propietarios')
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener los propietarios' })
  }
}

export const crearPropietario = async (req, res) => {
  try {
    const { nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion } = req.body

    const [resultado] = await pool.query(
      'INSERT INTO propietarios (nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion]
    )
    const propietarioCreado = {
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

    res.status(201).json(propietarioCreado)
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al crear el propietario' })
  }
}

export const obtenerPropietario = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('SELECT * FROM propietarios WHERE id_propietario = ?', [id])

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'No existe el propietario' })
    }

    res.status(200).json(resultado[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener el propietario' })
  }
}

export const eliminarPropietario = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('DELETE FROM propietarios WHERE id_propietario = ?', [id])

    if (resultado.affectedRows === 1) {
      res.status(204).json({ mensaje: 'Propietario eliminado' })
    } else {
      res.status(404).json({ mensaje: 'Propietario no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar el propietario' })
  }
}

export const actualizarPropietario = async (req, res) => {
  const { id } = req.params
  const { nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion } = req.body
  try {
    const [resultado] = await pool.query(
      'UPDATE propietarios SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), tipo_identificacion = IFNULL(?, tipo_identificacion), numero_identificacion = IFNULL(?, numero_identificacion), correo = IFNULL(?, correo), celular = IFNULL(?, celular), fecha_nacimiento = IFNULL(?, fecha_nacimiento), direccion = IFNULL(?, direccion) WHERE id_propietario = ?',
      [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, id]
    )

    if (resultado.affectedRows === 1) {
      res.status(200).json({ mensaje: 'Propietario actualizado' })
    } else {
      res.status(404).json({ mensaje: 'Propietario no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar la propietario', error: error.message })
  }
}
