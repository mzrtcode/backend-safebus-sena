import { pool } from "../db.js";

export const iniciarSesion = async (req, res) => {
    const { correo, clave } = req.body;
    console.log({correo, clave});
    res.send({correo, clave})
};
export const obtenerPerfil = async (req, res) => {
    // TO DO: Obtener el perfil del usuario
};
export const verificarSesion = async (req, res) => {
    // TO DO: Verificar si el usuario tiene una sesión activa
};
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
    } = req.body;

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
};
export const cerrarSesion = async (req, res) => {
    // TO DO: Cerrar la sesión del usuario
};