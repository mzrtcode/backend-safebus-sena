import { pool } from '../db.js'
import { enviarEmail } from '../utils/mailer.js'
import { generarClave } from '../utils/password.js'
import bcrypt from 'bcryptjs'

// Función que maneja la solicitud para obtener todas los administradores
export const obtenerAdministradores = async (req, res) => {
  try {
    const [resultado] = await pool.query('SELECT * FROM administradores')
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener los administradores' })
  }
}

// Función que maneja la solicitud para obtener un administrador por su ID
export const obtenerAdministrador = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('SELECT * FROM administradores WHERE id_administrador = ?', [id])
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener el administrador' })
  }
}

export const crearAdministrador = async (req, res) => {
  const {
    nombres,
    apellidos,
    tipo_identificacion,
    numero_identificacion,
    correo,
    celular,
    fecha_nacimiento,
    direccion
  } = req.body

  const clave = generarClave()
  console.log({ correo, clave })
  const claveCifrada = await bcrypt.hash(clave, 10)

  try {
    // Verificar si el correo electrónico ya está registrado
    const [existeVendedor] = await pool.query('SELECT * FROM vendedores WHERE correo = ?', [correo])
    const [existeAdministrador] = await pool.query('SELECT * FROM administradores WHERE correo = ?', [correo])

    if (existeVendedor.length > 0 || existeAdministrador.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' })
    }

    // Insertar el nuevo usuario
    const [resultado] = await pool.query('INSERT INTO administradores (nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, clave) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, claveCifrada])
    if (resultado.affectedRows > 0) {
      await enviarEmail(correo, 'Registro exitoso', `El registro se realizó correctamente
      Usuario: ${correo}
      Contraseña: ${clave}
      `)
      return res.status(201).json({ message: 'Usuario creado' })
    } else {
      return res.status(500).json({ message: 'No se pudo crear el usuario' })
    }
  } catch (error) {
    console.error('Error al registrar el usuario:', error)
    return res.status(500).json({ message: 'Error al registrar el usuario' })
  }
}

// Función que maneja la solicitud para actualizar un administrador existente.
export const actualizarAdministrador = async (req, res) => {
  const { id } = req.params
  const { nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, estado } = req.body
  try {
    const [resultado] = await pool.query(
      'UPDATE administradores SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), tipo_identificacion = IFNULL(?, tipo_identificacion), numero_identificacion = IFNULL(?, numero_identificacion), correo = IFNULL(?, correo), celular = IFNULL(?, celular), fecha_nacimiento = IFNULL(?, fecha_nacimiento), direccion = IFNULL(?, direccion), estado = IFNULL(?, estado) WHERE id_vendedor = ?',
      [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, estado, id]
    )
    if (resultado.affectedRows === 1) {
      res.status(200).json({ mensaje: 'Administrador actualizado' })
    } else {
      res.status(404).json({ mensaje: 'Administrador no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar el administrador', error: error.message })
  }
}

// Función que maneja la solicitud para eliminar un administrador existente.
export const eliminarAdministrador = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('DELETE FROM administradores WHERE id_vendedor = ?', [id])

    if (resultado.affectedRows === 1) {
      res.status(204).json({ mensaje: 'Administrador eliminado' })
    } else {
      res.status(404).json({ mensaje: 'Administrador no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar el administrador' })
  }
}

export const resetearClave = async (req, res) => {
  const { id } = req.params
  const clave = generarClave()
  const claveCifrada = await bcrypt.hash(clave, 10)

  try {
    let [administrador] = await pool.query('SELECT correo FROM administradores WHERE id_administrador = ?', [id])

    if (administrador.length === 0) {
      return res.status(404).json({ mensaje: 'Administrador no encontrado' })
    }

    administrador = administrador[0]

    const [resultado] = await pool.query('UPDATE administrador SET clave = ? WHERE id_administrador = ?', [claveCifrada, id])

    if (resultado.affectedRows === 1) {
      await enviarEmail(administrador.correo, 'Clave actualizada', `La clave se actualizó correctamente
      Usuario: ${administrador.correo}
      Contraseña: ${clave}
      `)

      return res.status(200).json({ mensaje: 'Clave actualizada' })
    } else {
      return res.status(404).json({ mensaje: 'Administrador no encontrado' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ mensaje: 'Error al actualizar la clave del administrador' })
  }
}
