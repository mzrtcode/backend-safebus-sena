// Función de middleware que valida el esquema de la solicitud
export const validarSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Se analiza el cuerpo de la solicitud utilizando el esquema proporcionado
        next(); // Si el cuerpo de la solicitud coincide con el esquema, se pasa el control al siguiente middleware
    } catch (error) {
        return res.status(400).json(error.errors.map((error) => error.message)); // Si se produce un error en el análisis, se devuelve una respuesta de error con los mensajes de error del esquema
    }
};
