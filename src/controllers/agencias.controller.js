import { pool } from '../db.js'

// Función que maneja la solicitud para obtener todas los Agencias
export const obtenerAgencias = async (req, res) => {
  try {
    const [resultado] = await pool.query('SELECT * FROM agencias')
    const agenciasConEstadoBooleano = resultado.map((agencia) =>({
      ...agencia,
      estado: agencia.estado === 1 ? true : false
    }))
    res.status(200).json({ data: agenciasConEstadoBooleano })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener los agencias' })
  }
}

// Función que maneja la solicitud para obtener una localidad por su ID
export const obtenerAgencia = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('SELECT * FROM agencias WHERE id_agencia = ?', [id])
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener la agencia' })
  }
}

// Función que maneja la solicitud para crear una nueva localidad.
export const crearAgencia = async (req, res) => {
  try {
    const { nombre, codigo_interno, direccion } = req.body
    const [resultado] = await pool.query('INSERT INTO agencias (nombre, codigo_interno, direccion) VALUES (?, ?, ?)', [nombre, codigo_interno, direccion])

    const agenciaCreada = {
      id: resultado.insertId, // Obtener el ID generado por la base de datos
      nombre,
      codigo_interno,
      direccion
    }

    res.status(201).json(agenciaCreada)
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al crear la agencia' })
  }
}

// Función que maneja la solicitud para actualizar una localidad existente.
export const actualizarAgencia = async (req, res) => {
  const { id } = req.params
  const { nombre, codigo_interno, direccion, estado } = req.body
  try {
    const [resultado] = await pool.query(
      'UPDATE agencias SET nombre = IFNULL(?, nombre), codigo_interno = IFNULL(?, codigo_interno), direccion = IFNULL(?, direccion),  estado = IFNULL(?, estado) WHERE id_agencia = ?',
      [nombre, codigo_interno, direccion, estado, id]
    )

    if (resultado.affectedRows === 1) {
      res.status(200).json({ mensaje: 'Agencia actualizada' })
    } else {
      res.status(404).json({ mensaje: 'Agencia no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar la agencia', error: error.message })
  }
}

// Función que maneja la solicitud para eliminar una localidad existente.
export const eliminarAgencia = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('DELETE FROM agencias WHERE id_agencia = ?', [id])

    if (resultado.affectedRows === 1) {
      res.status(204).json({ mensaje: 'Agencia eliminada' })
    } else {
      res.status(404).json({ mensaje: 'Agencia no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar la agencia' })
  }
}
