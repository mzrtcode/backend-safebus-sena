import { pool } from '../db.js'

// Función que maneja la solicitud para obtener todas las localidades
export const obtenerLocalidades = async (req, res) => {
  try {
    const [resultado] = await pool.query('SELECT * FROM localidades')
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener las localidades' })
  }
}

// Función que maneja la solicitud para obtener una localidad por su ID
export const obtenerLocalidad = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('SELECT * FROM localidades WHERE id_localidad = ?', [id])
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener la localidad' })
  }
}

// Función que maneja la solicitud para crear una nueva localidad.
export const crearLocalidad = async (req, res) => {
  try {
    const { nombre, acronimo } = req.body
    const [resultado] = await pool.query('INSERT INTO localidades (nombre, acronimo) VALUES (?, ?)', [nombre, acronimo])

    const localidadCreada = {
      id: resultado.insertId, // Obtener el ID generado por la base de datos
      nombre,
      acronimo
    }

    res.status(201).json(localidadCreada)
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al crear la localidad' })
  }
}

// Función que maneja la solicitud para actualizar una localidad existente.
export const actualizarLocalidad = async (req, res) => {
  const { id } = req.params
  const { nombre, acronimo } = req.body
  try {
    const [resultado] = await pool.query(
      'UPDATE localidades SET nombre = IFNULL(?, nombre), acronimo = IFNULL(?, acronimo) WHERE id_localidad = ?',
      [nombre, acronimo, id]
    )

    if (resultado.affectedRows === 1) {
      res.status(200).json({ mensaje: 'Localidad actualizada' })
    } else {
      res.status(404).json({ mensaje: 'Localidad no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar la localidad', error: error.message })
  }
}

// Función que maneja la solicitud para eliminar una localidad existente.
export const eliminarLocalidad = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('DELETE FROM localidades WHERE id_localidad = ?', [id])

    if (resultado.affectedRows === 1) {
      res.status(204).json({ mensaje: 'Localidad eliminada' })
    } else {
      res.status(404).json({ mensaje: 'Localidad no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar la Localidad' })
  }
}
