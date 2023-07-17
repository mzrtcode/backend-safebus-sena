import jwt from 'jsonwebtoken'
const TOKEN_SECRETO = process.env.TOKEN_SECRET

// Función de middleware que verifica la autenticación requerida
export const autenticacionRequerida = (req, res, next) => {
  const { token } = req.cookies // Se obtiene el token de las cookies de la solicitud

  if (!token) return res.status(401).json({ message: 'No token, No autorizado' })
  jwt.verify(token, TOKEN_SECRETO, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token invalido' })
    req.usuario = decoded
  })
  next() // Se llama a la siguiente función del middleware
}
