import { z } from 'zod'

// Esquema para el registro de usuarios
export const registroSchema = z.object({
  nombres: z.string({
    required_error: 'Los nombres son requeridos'
  }),
  apellidos: z.string({
    required_error: 'Los apellidos son requeridos'
  }),
  tipo_identificacion: z.literal('C.C.', 'T.I.', 'C.E.', 'Pasp.', {
    message: 'El tipo de identificación es requerido'
  }),
  numero_identificacion: z.string({
    required_error: 'El número de identificación es requerido'
  }),
  correo: z.string({
    required_error: 'El correo es requerido'
  })
    .email({
      message: 'El correo no es válido'
    }),
  celular: z.string({
    required_error: 'El celular es requerido'
  }).max(20, {
    required_error: 'El celular no es válido'
  })
    .optional(),
  fecha_nacimiento: z.string().refine((value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/ // Expresión regular para validar el formato "AAAA-MM-DD"
    return regex.test(value)
  }, {
    message: 'La fecha de nacimiento debe tener el formato AAAA-MM-DD'
  }).optional(),
  direccion: z.string({
    required_error: 'La dirección es requerida'
  }),
  clave: z.string({
    required_error: 'La clave es requerida'
  }),
  rol: z
    .literal('administrador', 'vendedor')
})

// Esquema para la autenticación de usuarios
export const autenticacionSchema = z.object({
  correo: z.string({
    required_error: 'El correo es requerido'
  }).email(
    { message: 'El correo no es válido' }
  ),
  clave: z.string({
    required_error: 'La clave es requerida'
  }).min(6, {
    message: 'La clave debe tener mínimo 6 caracteres'
  })
})
