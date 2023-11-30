import { obtenerReportePlanillaje, obtenerReporteRelacionPlanillas } from "../services/reportes.service.js";

// Función para validar el formato de la fecha
const validarFormatoFecha = (fecha) => {
    const fechaRegExp = /^\d{4}-\d{2}-\d{2}$/;
    return fechaRegExp.test(fecha);
};

export const obtenerReportePlanillajeController = async (req, res) => {
    try {
        const fecha = req.query.fecha;

        if (!fecha || !validarFormatoFecha(fecha)) {
            return res.status(400).json({ mensaje: 'La fecha no es válida. Debe tener el formato YYYY-MM-DD.' });
        }

        const id_vendedor = req.usuario.id_usuario;
        const respuesta = await obtenerReportePlanillaje(id_vendedor, fecha);

        res.status(200).json(respuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el reporte de planillaje' });
    }
};

export const obtenerReporteRelacionPlanillasController = async (req, res) => {
    try {
        const fecha = req.query.fecha;

        if (!fecha || !validarFormatoFecha(fecha)) {
            return res.status(400).json({ mensaje: 'La fecha no es válida. Debe tener el formato YYYY-MM-DD.' });
        }

        const id_vendedor = req.usuario.id_usuario;
        const respuesta = await obtenerReporteRelacionPlanillas(id_vendedor, fecha);

        res.status(200).json(respuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el reporte de relacion planillas' });
    }
};


