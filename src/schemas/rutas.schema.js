import { z } from 'zod'

export const crearRutaSchema = z.object({
  inicio_ruta: z.number({
    required_error: 'El inicio de la ruta es requerido',
    message: 'El inicio de la ruta es requerido'
  }),
  fin_ruta: z.number({
    required_error: 'El fin de la ruta es requerido',
    message: 'El fin de la ruta es requerido'
  }),
  estado: z.boolean().optional(),
  costo: z.number({
    required_error: 'El costo es requerido',
    message: 'El costo es requerido'
  })
})
