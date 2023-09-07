import { pool } from '../db.js'

export const obtenerTiquetesPorId = async (req, res) => {
    try {
        const { id } = req.params
        const [resultado] = await pool.query('SELECT * FROM tiquetes WHERE id_planilla = ?', [id])

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: 'No hay tiquetes registrados' })
        }

        res.status(200).json({ data: resultado })
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'Error al obtener los tiquetes' })
    }
}
export const registrarTiquete = async (req, res) => {
    try {
        const { id_planilla, puestos_vendidos } = req.body;

        // Obtener la cantidad de puestos disponibles en el vehículo
        const [cantidadPuestosVehiculo] = await pool.query(`
            SELECT ve.cantidad_puestos AS cantidad_puestos_vehiculo
            FROM planillas p
            JOIN vehiculos ve ON p.id_vehiculo = ve.id_vehiculo
            WHERE id_planilla = ?
        `, [id_planilla]);

        // Obtener la cantidad de puestos vendidos para la planilla
        const [tiquetesVendidos] = await pool.query('SELECT SUM(puestos_vendidos) AS total_puestos_vendidos FROM tiquetes WHERE id_planilla = ?', [id_planilla]);

        const totalPuestosVendidos = tiquetesVendidos[0].total_puestos_vendidos || 0;
        const cantidadPuestosDisponibles = cantidadPuestosVehiculo[0].cantidad_puestos_vehiculo - totalPuestosVendidos;
        
        if (puestos_vendidos <= cantidadPuestosDisponibles) {
            // Si hay suficientes puestos disponibles, inserta el tiquete
            const [resultado] = await pool.query('INSERT INTO tiquetes (id_planilla, puestos_vendidos) VALUES (?, ?)', [id_planilla, puestos_vendidos]);

            const tiqueteCreado = {
                id: resultado.insertId,
                id_planilla,
                puestos_vendidos
            };

            res.status(201).json(tiqueteCreado);
        } else {
            // Si no hay suficientes puestos disponibles, devuelve un error
            res.status(400).json({ mensaje: 'No hay suficientes puestos disponibles' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar el tiquete' });
    }
};
