import { pool } from '../db.js'
import jwt from 'jsonwebtoken'
import { crearTokenAcceso } from '../libs/jwt.js'
import bcrypt from 'bcryptjs'
import { enviarEmail } from '../utils/mailer.js'
import { generarClave } from '../utils/password.js'
const TOKEN_SECRETO = process.env.TOKEN_SECRET

// Función que maneja la solicitud de inicio de sesión de un usuario.
export const iniciarSesion = async (req, res) => {
  const { correo, clave } = req.body

  // Verificar en la tabla "administradores"
  const { success, datos } = await verificarCredenciales('administradores', correo, clave)
  if (success && datos) {
    const respuesta = {
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      correo: datos.correo,
      rol: datos.rol
    }
    const token = await crearTokenAcceso(respuesta)
    res.cookie('token', token)
    console.log(token)
    return res.send(respuesta)
  }

  // Verificar en la tabla "vendedores"
  const { success: vendedorSuccess, datos: vendedorDatos } = await verificarCredenciales('vendedores', correo, clave)
  if (vendedorSuccess && vendedorDatos) {
    const respuesta = {
      nombres: vendedorDatos.nombres,
      apellidos: vendedorDatos.apellidos,
      correo: vendedorDatos.correo,
      rol: vendedorDatos.rol,
      id_usuario: vendedorDatos.id_usuario
    }

    const token = await crearTokenAcceso(respuesta)
    res.cookie('token', token)
    console.log(token)

    return res.send(respuesta)
  }

  // Si no se encontró el usuario en ninguna tabla
  res.status(401).send('Credenciales inválidas')
}

async function verificarCredenciales (tabla, correo, clave) {
  try {
    // Realizar la consulta SQL para obtener el usuario según el correo
    const [resultado] = await pool.query(`SELECT * FROM ${tabla} WHERE estado = 1 AND correo = ?`, [correo])

    if (resultado.length > 0) {
      const usuario = resultado[0]
      const datos = {
        nombres: resultado[0].nombres,
        apellidos: resultado[0].apellidos,
        correo: usuario.correo,
        rol: tabla === 'administradores' ? 'administrador' : 'vendedor',
        id_usuario: tabla === 'administradores' ? usuario.id_administrador : usuario.id_vendedor
      }

      // Verificar si el estado del usuario es 1 (habilitado)
      if (usuario.estado === 1) {
        // Comparar la contraseña cifrada con la contraseña proporcionada
        const esClaveCorrecta = await bcrypt.compare(clave, usuario.clave)

        if (esClaveCorrecta) {
          return { success: true, datos } // Devuelve un objeto con la propiedad "success" y los datos del usuario
        } else {
          return { success: false, datos } // Devuelve un objeto con la propiedad "success" y los datos del usuario
        }
      } else {
        return { success: false, mensaje: 'El usuario no está habilitado.' }
      }
    }

    return { success: false } // Si no se encontró el usuario, retorna un objeto con la propiedad "success" en false
  } catch (error) {
    console.error('Error al verificar las credenciales:', error)
    return { success: false, error } // Devuelve un objeto con la propiedad "success" en false y el error
  }
}

// Función que maneja la solicitud para obtener el perfil del usuario:
export const obtenerPerfil = async (req, res) => {
  const { correo } = req.usuario

  try {
    let usuarioEncontrado

    // Verificar en la tabla "administradores"
    const [administradorEncontrado] = await pool.query('SELECT * FROM administradores WHERE correo = ?', [correo])
    if (administradorEncontrado.length > 0) {
      usuarioEncontrado = administradorEncontrado[0]
      usuarioEncontrado.rol = 'administrador'
    }

    // Si no se encontró en "administradores", verificar en la tabla "vendedores"
    if (!usuarioEncontrado) {
      const [vendedorEncontrado] = await pool.query('SELECT * FROM vendedores WHERE correo = ?', [correo])
      if (vendedorEncontrado.length > 0) {
        usuarioEncontrado = vendedorEncontrado[0]
        usuarioEncontrado.rol = 'vendedor'
      }
    }

    if (usuarioEncontrado) {
      console.log(usuarioEncontrado, correo)
      return res.json({
        nombres: usuarioEncontrado.nombres,
        apellidos: usuarioEncontrado.apellidos,
        correo: usuarioEncontrado.correo,
        rol: usuarioEncontrado.rol
      })
    }

    return res.status(404).json({ message: 'Usuario no encontrado' })
  } catch (error) {
    console.error('Error al obtener el perfil:', error)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
}

// Función que maneja la solicitud para verificar si el usuario tiene una sesión activa:
export const verificarSesion = async (req, res) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ message: 'Sin token' })
  }

  jwt.verify(token, TOKEN_SECRETO, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token invalido' })
    return res.json(decoded)
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
    rol
  } = req.body

  let tabla

  if (rol === 'administrador') {
    tabla = 'administradores'
  } else if (rol === 'vendedor') {
    tabla = 'vendedores'
  } else {
    return res.status(400).json({ message: 'Rol inválido' })
  }

  const clave = generarClave()
  console.log({ correo, clave })
  const claveCifrada = await bcrypt.hash(clave, 10)

  try {
    // Verificar si el correo electrónico ya está registrado
    const [existeUsuario] = await pool.query(`SELECT * FROM ${tabla} WHERE correo = ?`, [correo])

    if (existeUsuario.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' })
    }

    // Insertar el nuevo usuario
    const [resultado] = await pool.query(`INSERT INTO ${tabla} (nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, clave) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [nombres, apellidos, tipo_identificacion, numero_identificacion, correo, celular, fecha_nacimiento, direccion, claveCifrada])
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

// Función que maneja la solicitud de cerrar la sesión de un usuario:
export const cerrarSesion = async (req, res) => {
  res.cookie('token', '', { expires: new Date(0) })
  res.sendStatus(200)
}
