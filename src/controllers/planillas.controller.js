import { pool } from '../db.js'

// Función que maneja la solicitud para obtener todas los Agencias
export const obtenerPlanillas = async (req, res) => {
  try {
    const [resultado] = await pool.query(`SELECT
    p.id_planilla,
    p.viaje_completado,
    p.hora_salida,
    lr.nombre AS inicio_ruta,
    lf.nombre AS fin_ruta,
    c.nombres AS nombre_conductor,
    c.apellidos AS apellido_conductor,
    v.nombres AS nombre_vendedor,
    v.apellidos AS apellido_vendedor,
    ve.placa AS numero_placa_vehiculo,
    ve.codigo_interno AS codigo_interno_vehiculo,
    a.nombre AS nombre_agencia
  FROM
    planillas p
    JOIN rutas r ON p.id_ruta = r.id_ruta
    JOIN localidades lr ON r.inicio_ruta = lr.id_localidad
    JOIN localidades lf ON r.fin_ruta = lf.id_localidad
    JOIN conductores c ON p.id_conductor = c.id_conductor
    JOIN vendedores v ON p.id_vendedor = v.id_vendedor
    JOIN vehiculos ve ON p.id_vehiculo = ve.id_vehiculo
    JOIN agencias a ON p.id_agencia = a.id_agencia;
  
  `)
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener las planillas' })
  }
}
