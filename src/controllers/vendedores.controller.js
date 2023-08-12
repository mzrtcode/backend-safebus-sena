import { pool } from '../db.js'

// Función que maneja la solicitud para obtener todas los vendedores
export const obtenerVendedores = async (req, res) => {
  try {
    const [resultado] = await pool.query('SELECT * FROM vendedores')
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener las vendedores' })
  }
}

// Función que maneja la solicitud para obtener una localidad por su ID
export const obtenerVendedor = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('SELECT * FROM vendedores WHERE id_vendedor = ?', [id])
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener el vendedor' })
  }
}

// Función que maneja la solicitud para crear una nueva localidad.
export const crearVendedor = async (req, res) => {
  try {
    const { nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion } = req.body

    const [resultado] = await pool.query(
      'INSERT INTO vendedores (nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
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

// Función que maneja la solicitud para actualizar una localidad existente.
export const actualizarVendedor = async (req, res) => {
  const { id } = req.params
  const { nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion } = req.body
  try {
    const [resultado] = await pool.query(
      'UPDATE vendedores SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), tipo_identificacion = IFNULL(?, tipo_identificacion), numero_identificacion = IFNULL(?, numero_identificacion), correo = IFNULL(?, correo), celular = IFNULL(?, celular), fecha_nacimiento = IFNULL(?, fecha_nacimiento), direccion = IFNULL(?, direccion) WHERE id_propietario = ?',
      [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, id]
    )

    if (resultado.affectedRows === 1) {
      res.status(200).json({ mensaje: 'Vendedor actualizado' })
    } else {
      res.status(404).json({ mensaje: 'Vendedor no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar el vendedor', error: error.message })
  }
}

// Función que maneja la solicitud para eliminar una localidad existente.
export const eliminarVendedor = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('DELETE FROM vendedores WHERE id_vendedor = ?', [id])

    if (resultado.affectedRows === 1) {
      res.status(204).json({ mensaje: 'Vendedor eliminado' })
    } else {
      res.status(404).json({ mensaje: 'Vendedor no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar el vendedor' })
  }
}
