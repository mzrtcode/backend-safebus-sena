import { pool } from '../db.js'

export const obtenerEstadisticasVendedores = async (req, res) => {
  try {
    const [resultado] = await pool.query(`
    SELECT 
    COALESCE((SELECT COUNT(*) 
               FROM planillas 
               WHERE viaje_completado = 1
                 AND DATE(hora_salida) = CURDATE()
              ), 0) AS total_viajes_completados,
    COALESCE(SUM(t.puestos_vendidos), 0) AS total_puestos_vendidos,
    COALESCE((SELECT SUM(r.costo * t.puestos_vendidos) 
               FROM tiquetes t
               INNER JOIN planillas p ON t.id_planilla = p.id_planilla
               INNER JOIN rutas r ON p.id_ruta = r.id_ruta
                 AND DATE(p.hora_salida) = CURDATE()
              ), 0) AS total_ventas,
    COALESCE((SELECT ROUND(SUM(v.cantidad_puestos * r.costo * (SELECT porcentaje_costo_planilla FROM empresa) / 100), 0)
              FROM planillas p
              LEFT JOIN vehiculos v ON p.id_vehiculo = v.id_vehiculo
              LEFT JOIN rutas r ON p.id_ruta = r.id_ruta
              WHERE DATE(p.hora_salida) = CURDATE()
             ), 0) AS total_planillas
FROM planillas p
LEFT JOIN tiquetes t ON p.id_planilla = t.id_planilla
  AND DATE(p.hora_salida) = CURDATE();
    `);

    // Realizar conversión de campos a números
    const {
      total_viajes_completados,
      total_puestos_vendidos,
      total_ventas,
      total_planillas,
    } = resultado[0];

    // Convertir campos a números
    const totalViajes = parseInt(total_viajes_completados);
    const totalPuestos = parseInt(total_puestos_vendidos) ;
    const totalVentas = parseInt(total_ventas);
    const totalPlanillas = parseInt(total_planillas);

    // Crear un objeto con los resultados convertidos
    const estadisticas = {
      total_viajes_completados: totalViajes,
      total_puestos_vendidos: totalPuestos,
      total_ventas: totalVentas,
      total_planillas: totalPlanillas,
    };

    res.status(200).json({ data: estadisticas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener las estadísticas de los vendedores' });
  }
}







export const obtenerEstadisticasVendedorId = async (req, res) => {
  try {
    const { id: id_vendedor } = req.params;
    const [resultado] = await pool.query(`
    SELECT 
    COALESCE((SELECT COUNT(*) 
               FROM planillas 
               WHERE viaje_completado = 1
                 AND id_vendedor = ?
                 AND DATE(hora_salida) = CURDATE()
              ), 0) AS total_viajes_completados,
    COALESCE(SUM(t.puestos_vendidos), 0) AS total_puestos_vendidos,
    COALESCE((SELECT SUM(r.costo * t.puestos_vendidos) 
               FROM tiquetes t
               INNER JOIN planillas p ON t.id_planilla = p.id_planilla
               INNER JOIN rutas r ON p.id_ruta = r.id_ruta
               WHERE p.id_vendedor = ?
                 AND DATE(p.hora_salida) = CURDATE()
              ), 0) AS total_ventas,
    COALESCE((SELECT ROUND(SUM(v.cantidad_puestos * r.costo * (SELECT porcentaje_costo_planilla FROM empresa) / 100), 0)
              FROM planillas p
              LEFT JOIN vehiculos v ON p.id_vehiculo = v.id_vehiculo
              LEFT JOIN rutas r ON p.id_ruta = r.id_ruta
              WHERE DATE(p.hora_salida) = CURDATE()
             ), 0) AS total_planillas
FROM planillas p
LEFT JOIN tiquetes t ON p.id_planilla = t.id_planilla
WHERE p.id_vendedor = ?
  AND DATE(p.hora_salida) = CURDATE();
    `, [id_vendedor, id_vendedor, id_vendedor]);

    // Realizar conversión de campos a números
    const {
      total_viajes_completados,
      total_puestos_vendidos,
      total_ventas,
      total_planillas,
    } = resultado[0];

    // Convertir campos a números
    const totalViajes = parseInt(total_viajes_completados)  ?? 0;
    const totalPuestos = parseInt(total_puestos_vendidos)  ?? 0;
    const totalVentas = parseInt(total_ventas)  ?? 0;
    const totalPlanillas = parseInt(total_planillas)  ?? 0;

    // Crear un objeto con los resultados convertidos
    const estadisticas = {
      total_viajes_completados: totalViajes,
      total_puestos_vendidos: totalPuestos,
      total_ventas: totalVentas,
      total_planillas: totalPlanillas,
    };

    res.status(200).json({ data: estadisticas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener las estadísticas del vendedor' });
  }
}

