import { pool } from "../db.js";

// Función que maneja la solicitud para obtener todas las localidades
export const obtenerLocalidades = async (req, res) => {
    try {
        const [resultado] = await pool.query('SELECT * FROM localidades');
        res.status(200).json({ data: resultado });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al obtener las localidades" });
    }
}

// Función que maneja la solicitud para obtener una localidad por su ID
export const obtenerLocalidad = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query('SELECT * FROM localidades WHERE id_localidad = ?', [id]);
        res.status(200).json({ data: resultado });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al obtener la localidad" });
    }
}

//Función que maneja la solicitud para crear una nueva localidad.
export const crearLocalidad = async (req, res) => {
    try {
        const { nombre, acronimo } = req.body;
        const [resultado] = await pool.query('INSERT INTO localidades (nombre, acronimo) VALUES (?, ?)', [nombre, acronimo]);

        const localidadCreada = {
            id: resultado.insertId, // Obtener el ID generado por la base de datos
            nombre: nombre,
            acronimo: acronimo
        };

        res.status(201).json(localidadCreada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al crear la localidad" });
    }
}

// Función que maneja la solicitud para actualizar una localidad existente.
export const actualizarLocalidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, acronimo } = req.body;
        const [resultado] = await pool.query('UPDATE localidades SET nombre = ?, acronimo = ? WHERE id_localidad = ?', [nombre, acronimo, id]);
        res.status(204).json({ mensaje: "Localidad actualizada correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar la localidad" });
    }
}

// Función que maneja la solicitud para eliminar una localidad existente.
export const eliminarLocalidad = async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await pool.query('DELETE FROM localidades WHERE id_localidad = ?', [id]);
        res.status(204).json({mensaje: "Localidad eliminada correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al eliminar la localidad" });
    }
}