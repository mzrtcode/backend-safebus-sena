import jwt from 'jsonwebtoken';
const TOKEN_SECRETO = process.env.TOKEN_SECRET;

export const autenticacionRequerida = (req, res, next) => {
    const {token} = req.cookies;

   /*  if(!token) return res.status(401).json({message: 'No token, No autorizado'});
    jwt.verify(token, TOKEN_SECRETO, (err, decoded) => {
        if(err) return res.status(401).json({message: 'Token invalido'});
        req.user = decoded;
    }) */
    next();
}