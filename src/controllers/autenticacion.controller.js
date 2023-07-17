import { pool } from '../db.js'
import jwt from 'jsonwebtoken'
import { crearTokenAcceso } from '../libs/jwt.js'
import bcrypt from 'bcryptjs'
const TOKEN_SECRETO = process.env.TOKEN_SECRET

// Función que maneja la solicitud de inicio de sesión de un usuario.
export const iniciarSesion = async (req, res) => {
  const { correo, clave } = req.body

  // Verificar en la tabla "administradores"
  const resultadoAdministradores = await verificarCredenciales('administradores', correo, clave)
  if (resultadoAdministradores) {
    const respuesta = {
      correo,
      clave,
      rol: 'administrador'
    }
    const token = crearTokenAcceso(respuesta)
    res.cookie('token', token)
    return res.send(respuesta)
  }

  // Verificar en la tabla "vendedores"
  const resultadoVendedores = await verificarCredenciales('vendedores', correo, clave)
  if (resultadoVendedores) {
    const respuesta = {
      correo,
      clave,
      rol: 'vendedor'
    }
    const token = crearTokenAcceso(respuesta)
    res.cookie('token', token)
    return res.send(respuesta)
  }

  // Si no se encontró el usuario en ninguna tabla
  res.status(401).send('Credenciales inválidas')
}

async function verificarCredenciales (tabla, correo, clave) {
  try {
    // Realizar la consulta SQL para obtener el usuario según el correo
    const [resultado] = await pool.query(`SELECT * FROM ${tabla} WHERE correo = ?`, [correo])

    if (resultado.length > 0) {
      const usuario = resultado[0]
      // Comparar la contraseña cifrada con la contraseña proporcionada
      const esClaveCorrecta = await bcrypt.compare(clave, usuario.clave)

      return esClaveCorrecta // Devuelve true si la contraseña es correcta, o false en caso contrario
    }

    return false // Si no se encontró el usuario, retorna false
  } catch (error) {
    console.error('Error al verificar las credenciales:', error)
    return false
  }
}

// Función que maneja la solicitud para obtener el perfil del usuario:
export const obtenerPerfil = async (req, res) => {
  // TO DO: Obtener el perfil del usuario
}

// Función que maneja la solicitud para verificar si el usuario tiene una sesión activa:
export const verificarSesion = async (req, res) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json({ message: 'Sin token' })
  jwt.verify(token, TOKEN_SECRETO, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token invalido' })
    const userFound = await User.findById(decoded.id)
    if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' })
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}

// Función que maneja la solicitud de registro de un usuario:
export const registrarUsuario = async (req, res) => {
  const {
    nombres,
    apellidos,
    tipo_identificacion,
    numero_identificacion,
    correo,
    celular,
    fecha_nacimiento,
    direccion,
    clave
  } = req.body

  console.log({
    nombres,
    apellidos,
    tipo_identificacion,
    numero_identificacion,
    correo,
    celular,
    fecha_nacimiento,
    direccion,
    clave
  })
  res.send({
    nombres,
    apellidos,
    tipo_identificacion,
    numero_identificacion,
    correo,
    celular,
    fecha_nacimiento,
    direccion,
    clave
  })
}

// Función que maneja la solicitud de cerrar la sesión de un usuario:
export const cerrarSesion = async (req, res) => {
  res.cookie('token', '', { expires: new Date(0) })
  res.sendStatus(200)
}
