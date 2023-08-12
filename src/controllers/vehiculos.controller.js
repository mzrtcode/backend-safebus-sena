import { pool } from '../db.js'

// Función que maneja la solicitud para obtener todas los Vehiculos
export const obtenerVehiculos = async (req, res) => {
  try {
    const [resultado] = await pool.query(`
      SELECT v.*, p.nombres AS nombres_propietario, p.apellidos AS apellidos_propietario, p.numero_identificacion AS numero_identificacion_propietario
      FROM vehiculos v
      INNER JOIN propietarios p ON v.id_propietario = p.id_propietario
    `)
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener los vehiculos' })
  }
}

export const crearVehiculo = async (req, res) => {
  try {
    const { id_propietario, placa, marca, modelo, color, anio_fabricacion, codigo_interno, cantidad_puestos } = req.body
    const [resultado] = await pool.query('INSERT INTO vehiculos (id_propietario, placa, marca, modelo, color, anio_fabricacion, codigo_interno, cantidad_puestos) VALUES (?,?,?,?,?,?,?,?)', [id_propietario, placa, marca, modelo, color, anio_fabricacion, codigo_interno, cantidad_puestos])

    const vehiculoCreado = {
      id: resultado.insertId, // Obtener el ID generado por la base de datos
      placa,
      marca,
      modelo,
      color,
      anio_fabricacion,
      codigo_interno,
      cantidad_puestos
    }

    res.status(201).json(vehiculoCreado)
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al crear el vehiculo' })
  }
}

export const obtenerVehiculo = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query(`
      SELECT v.*, p.nombres AS nombres_propietario, p.apellidos AS apellidos_propietario, p.numero_identificacion AS numero_identificacion_propietario
      FROM vehiculos v
      INNER JOIN propietarios p ON v.id_propietario = p.id_propietario
      WHERE v.id_vehiculo = ?`, [id])

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'No existe el vehiculo' })
    }

    res.status(200).json(resultado[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener el vehiculo' })
  }
}

export const eliminarVehiculo = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('DELETE FROM vehiculos WHERE id_vehiculo = ?', [id])

    if (resultado.affectedRows === 1) {
      res.status(204).json({ mensaje: 'Vehiculo eliminado' })
    } else {
      res.status(404).json({ mensaje: 'Vehiculo no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar el vehiculo' })
  }
}

export const actualizarVehiculo = async (req, res) => {
  const { id } = req.params
  const { placa, marca, modelo, color, anio_fabricacion, codigo_interno, cantidad_puestos } = req.body
  try {
    const [resultado] = await pool.query(
      'UPDATE vehiculos SET placa = IFNULL(?, placa), marca = IFNULL(?, marca), modelo = IFNULL(?, modelo), color = IFNULL(?, color), anio_fabricacion = IFNULL(?, anio_fabricacion), codigo_interno = IFNULL(?, codigo_interno), cantidad_puestos = IFNULL(?, cantidad_puestos) WHERE id_vehiculo = ?',
      [placa, marca, modelo, color, anio_fabricacion, codigo_interno, cantidad_puestos, id]
    )

    if (resultado.affectedRows === 1) {
      res.status(200).json({ mensaje: 'Vehiculo actualizado' })
    } else {
      res.status(404).json({ mensaje: 'Vehiculo no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar el vehiculo', error: error.message })
  }
}
