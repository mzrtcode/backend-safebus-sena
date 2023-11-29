import { obtenerReportePlanillaje } from "../services/reportes.service.js";

export const obtnerReportePlanillaje = async (req, res) => {
    try {
        const {fecha} = req.body;
        const id_vendedor = req.usuario.id_usuario
         const respuesta = await obtenerReportePlanillaje(id_vendedor, fecha)
        res.status(200).json(respuesta)
    } catch (error) {
      console.log(error)
      res.status(500).json({ mensaje: 'Error al obtener el reporte de planillaje' })
    }
  }