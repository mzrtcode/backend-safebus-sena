import { pool } from '../db.js'

// Función que maneja la solicitud para obtener todas los conductores
export const obtenerEmpresa = async (req, res) => {
  try {
    const [resultado] = await pool.query('SELECT nit, razon_social, direccion, telefono, ciudad, mensaje, porcentaje_costo_planilla, fondo_reposicion FROM empresa WHERE id_empresa = 1')
    res.status(200).json({ data: resultado })
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al obtener los datos de la empresa' })
  }
}

export const actualizarEmpresa = async (req, res) => {
  try {
    const { nit, razon_social, direccion, telefono, ciudad, mensaje, porcentaje_costo_planilla, fondo_reposicion } = req.body;
    
    // Realizar la actualización en la base de datos
    const [resultado] = await pool.query('UPDATE empresa SET razon_social = ?, direccion = ?, telefono = ?, ciudad = ?, mensaje = ?, porcentaje_costo_planilla = ?, fondo_reposicion = ? WHERE id_empresa = 1', [razon_social, direccion, telefono, ciudad, mensaje, porcentaje_costo_planilla, fondo_reposicion, nit]);
    
    // Verificar si se realizó la actualización
    if (resultado.affectedRows > 0) {
      // Si se actualizó, obtener los datos actualizados directamente de la base de datos
      const [datosActualizados] = await pool.query('SELECT * FROM empresa WHERE id_empresa = 1');
      
      // Retornar los datos actualizados como JSON con el código de estado 201
      res.status(201).json({ mensaje: 'Datos actualizados', datos: datosActualizados[0] });
    } else {
      // Si no se actualizó ningún registro, retornar un mensaje de error con el código de estado 404
      res.status(404).json({ mensaje: 'No se fue posible actualizar los datos de la empresa' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al actualizar los datos de la empresa' });
  }
};

