import {z} from 'zod';

export const crearLocalidadSchema = z.object({
    nombre: z.string({
        required_error: 'El nombre es requerido'
    }).max(30,{
        message: 'El nombre debe tener 30 caracteres'
    }),
    acronimo: z.string({
        required_error: 'El acronimo es requerido'
    }).max(3,{
        message: 'El acronimo debe tener 3 caracteres'
    })
});