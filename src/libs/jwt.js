const TOKEN_SECRETO = process.env.TOKEN_SECRET;
import jwt from "jsonwebtoken";

export function crearTokenAcceso(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload
        , TOKEN_SECRETO ,{},
        (err, token) => {
            if(err) reject(err)
            resolve(token)
        })
    })
}