import { pool } from '../db.js'

export const obtenerReportePlanillaje = async (id, fecha) => {
    try {
        const [resultado] = await pool.query(`
            SELECT 
                p.id_ruta, 
                li.nombre AS inicio_ruta, 
                lf.nombre AS fin_ruta, 
                t.puestos_vendidos,
                r.costo * t.puestos_vendidos AS total_costo,
                a.nombre as agencia_nombre,
                a.id_agencia
            FROM tiquetes t
            LEFT JOIN planillas p ON t.id_planilla = p.id_planilla
            LEFT JOIN agencias a ON p.id_agencia = a.id_agencia
            LEFT JOIN rutas r ON p.id_ruta = r.id_ruta
            LEFT JOIN localidades li ON r.inicio_ruta = li.id_localidad
            LEFT JOIN localidades lf ON r.fin_ruta = lf.id_localidad
            WHERE DATE(t.fecha_hora) = DATE(?) AND p.id_vendedor = ?
        `, [fecha, id]);

        return resultado;
    } catch (e) {
        console.error(e);
    }
};
