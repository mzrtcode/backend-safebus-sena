import { z } from 'zod';

const fechaRegExp = /^\d{4}-\d{2}-\d{2}$/;

export const obtenerReportePlanillajeSchema = z.object({
  fecha: z.string({
    required_error: 'El campo fecha es requerido'
  }).refine((fecha) => fechaRegExp.test(fecha), {
    message: 'La fecha debe tener el formato YYYY-MM-DD'
  })
});