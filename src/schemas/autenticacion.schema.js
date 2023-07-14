import { z } from 'zod';

export const registroSchema = z.object({
    nombres: z.string({
        required_error: 'Los nombres son requeridos'
    }),
    apellidos: z.string({
        required_error: 'Los apellidos son requeridos'
    }),
    tipo_identificacion: z.literal('C.C.', 'T.I.', 'C.E.', 'Pasp.', {
        required_error: 'El tipo de identificación es requerido'
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
    fecha_nacimiento: z.string({
        required_error: 'La fecha de nacimiento es requerida'
    })
        .datetime({
            message: 'La fecha de nacimiento no es válida, debe estar en UTC'
        }).optional(),
    direccion: z.string({
        required_error: 'La dirección es requerida'
    }),
    clave: z.string({
        required_error: 'La clave es requerida'
    })
});

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
});