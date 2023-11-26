import { z } from 'zod';

// Esquema de validación para la actualización de la empresa
export const actualizarEmpresaSchema = z.object({
  nit: z.string({
    required_error: 'El NIT es requerido',
    message: 'El NIT es requerido'
  }),
  razon_social: z.string({
    required_error: 'La razón social es requerida',
    message: 'La razón social es requerida'
  }),
  direccion: z.string({
    required_error: 'La dirección es requerida',
    message: 'La dirección es requerida'
  }),
  telefono: z.string({
    required_error: 'El teléfono es requerido',
    message: 'El teléfono es requerido'
  }),
  ciudad: z.string({
    required_error: 'La ciudad es requerida',
    message: 'La ciudad es requerida'
  }),
  mensaje: z.string().optional(),
  porcentaje_costo_planilla: z.number().optional(),
  fondo_reposicion: z.number().optional()
});


