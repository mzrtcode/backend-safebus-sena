import { pool } from '../db.js'
import { calcularHoraSalida, obtenerFechaHoraMySQL } from '../utils/utils.js';

// Función que maneja la solicitud para obtener todas los Agencias
export const obtenerPlanillas = async (req, res) => {
  const rol_usuario = req.usuario.rol;
  const id_vendedor = req.usuario.id_usuario;

  try {
    let query = `
      SELECT
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
        ve.cantidad_puestos AS cantidad_puestos_vehiculo,
        r.costo as precio_ruta,
        a.nombre AS nombre_agencia,
        a.direccion AS direccion_agencia,
        lr.acronimo AS acronimo_inicio,
        lf.acronimo AS acronimo_fin
      FROM
        planillas p
        JOIN rutas r ON p.id_ruta = r.id_ruta
        JOIN localidades lr ON r.inicio_ruta = lr.id_localidad
        JOIN localidades lf ON r.fin_ruta = lf.id_localidad
        JOIN conductores c ON p.id_conductor = c.id_conductor
        JOIN vendedores v ON p.id_vendedor = v.id_vendedor
        JOIN vehiculos ve ON p.id_vehiculo = ve.id_vehiculo
        JOIN agencias a ON p.id_agencia = a.id_agencia
    `;

    const queryParams = [];

    if (rol_usuario === 'vendedor') {
      query += ' WHERE p.id_vendedor = ? AND DATE(p.hora_salida) = CURDATE();'
      queryParams.push(id_vendedor);
    }

    const [resultado] = await pool.query(query, queryParams);
    console.log(query)

    res.status(200).json({ data: resultado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener las planillas' });
  }
};


export const crearPlanilla = async (req, res) => {
   const hora_salida = calcularHoraSalida(new Date());
  try {
    const { id_ruta, id_conductor, id_vehiculo, id_agencia, id_vendedor } = req.body
      // Insertar la nueva planilla
    const [resultado] = await pool.query('INSERT INTO planillas (id_ruta, id_conductor, id_vehiculo, id_agencia, id_vendedor, hora_salida) VALUES (?, ?, ?, ?, ?, ?)', [id_ruta, id_conductor, id_vehiculo, id_agencia, id_vendedor, hora_salida])

     // Obtener la información relacionada con el ID recién insertado
     const [planillaInsertada] = await pool.query('SELECT * FROM planillas WHERE id_planilla = ?', [resultado.insertId]);

    res.status(201).json(planillaInsertada[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al crear la planilla' })
  }
}

export const completarViaje = async (req, res) => {
  try {
    const { id } = req.params
    
    const [resultado] = await pool.query('UPDATE planillas SET viaje_completado=1 WHERE id_planilla = ?', [id])
    if (resultado.affectedRows === 1) {
      res.status(200).json({ mensaje: 'Planilla actualizada' })
    } else {
      res.status(404).json({ mensaje: 'Planilla no encontrada' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al actualizar la planilla' })
  }
}


export const eliminarPlanilla = async (req, res) => {
  try {
    const { id } = req.params
    const [resultado] = await pool.query('DELETE FROM planillas WHERE id_planilla = ?', [id])

    if (resultado.affectedRows === 1) {
      res.status(204).json({ mensaje: 'Planilla eliminada' })
    } else {
      res.status(404).json({ mensaje: 'Planilla no encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar la Planilla' })
  }
}
