import { pool } from '../db.js'

export const obtenerReportePlanillaje = async (id, fecha) => {
    try {
        const [resultado] = await pool.query(`
        SELECT
        p.id_ruta,
        CONCAT(li.nombre, '-', lf.nombre) AS ruta,
        SUM(t.puestos_vendidos) AS total_puestos_vendidos,
        SUM(r.costo * t.puestos_vendidos) AS total_costo,
        a.nombre AS agencia_nombre,
        a.id_agencia
      FROM tiquetes t
      LEFT JOIN planillas p ON t.id_planilla = p.id_planilla
      LEFT JOIN vehiculos v ON p.id_vehiculo = v.id_vehiculo
      LEFT JOIN agencias a ON p.id_agencia = a.id_agencia
      LEFT JOIN rutas r ON p.id_ruta = r.id_ruta
      LEFT JOIN localidades li ON r.inicio_ruta = li.id_localidad
      LEFT JOIN localidades lf ON r.fin_ruta = lf.id_localidad
      WHERE DATE(t.fecha_hora) = DATE(?) AND p.id_vendedor = ?
      GROUP BY p.id_ruta, ruta, a.nombre, a.id_agencia;
        `, [fecha, id]);

        return resultado;
    } catch (e) {
        console.error(e);
    }
};


export const obtenerReporteRelacionPlanillas = async (id, fecha) => {
    try {
        const [resultado] = await pool.query(`
        SELECT
  p.id_planilla,
  v.placa,
  r.id_ruta,
  CAST(SUM(t.puestos_vendidos) AS SIGNED) as pasajes,
  CAST(SUM(t.puestos_vendidos * r.costo) AS SIGNED) as valor_total
FROM
  tiquetes t 
  LEFT JOIN planillas p ON t.id_planilla = p.id_planilla
  LEFT JOIN vehiculos v ON p.id_vehiculo = v.id_vehiculo
  LEFT JOIN rutas r ON p.id_ruta = r.id_ruta
  WHERE DATE(t.fecha_hora) = DATE(?) AND p.id_vendedor = ?
GROUP BY
  p.id_planilla,
  v.placa,
  r.id_ruta;
        `,[fecha, id]);
return resultado;
    }
    catch (e) {
        console.error(e);
    }
}