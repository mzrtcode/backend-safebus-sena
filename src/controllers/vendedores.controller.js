import { pool } from '../db.js'
import { enviarEmail } from '../utils/mailer.js'
import { generarClave } from '../utils/password.js'
import bcrypt from 'bcryptjs'

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

export const crearVendedor = async (req, res) => {
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
    const [resultado] = await pool.query('INSERT INTO vendedores (nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, clave) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, claveCifrada])
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
