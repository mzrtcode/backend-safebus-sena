// Se obtiene el secreto del token desde una variable de entorno
import jwt from 'jsonwebtoken'; const TOKEN_SECRETO = process.env.TOKEN_SECRET

// Función para crear un token de acceso
export function crearTokenAcceso (payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, // El objeto payload que contendrá la información a incluir en el token
      TOKEN_SECRETO, // El secreto utilizado para firmar el token
      {}, // Opciones adicionales (en este caso, no se proporcionan opciones)
      (err, token) => {
        if (err) reject(err) // Si hay un error al firmar el token, se rechaza la promesa con el error
        resolve(token) // Si no hay errores, se resuelve la promesa con el token generado
      }
    )
  })
}
