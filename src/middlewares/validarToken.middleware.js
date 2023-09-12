import jwt from 'jsonwebtoken'
const TOKEN_SECRETO = process.env.TOKEN_SECRET

// Middleware para autenticación en general
export const autenticacionRequerida = (req, res, next) => {
  const { token } = req.cookies // Se obtiene el token de las cookies de la solicitud

  if (!token) return res.status(401).json({ message: 'No token, No autorizado' })
  jwt.verify(token, TOKEN_SECRETO, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token invalido' })
    req.usuario = decoded
  })
  next() // Se llama a la siguiente función del middleware
}


// Middleware para administradores
export const autenticacionAdmin = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'No token, No autorizado' });
  jwt.verify(token, TOKEN_SECRETO, (err, decoded) => {
    console.log(decoded)
    if (err) return res.status(401).json({ message: 'Token invalido' });
    if (decoded.rol !== 'administrador') {
      return res.status(403).json({ message: 'Acceso no autorizado para vendedores' });
    }
    req.usuario = decoded;
    next();
  });
};

// Middleware para vendedores
export const autenticacionVendedor = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'No token, No autorizado' });
  jwt.verify(token, TOKEN_SECRETO, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token invalido' });
    if (decoded.rol !== 'vendedor') {
      return res.status(403).json({ message: 'Acceso no autorizado para administradores' });
    }
    req.usuario = decoded;
    next();
  });
};
