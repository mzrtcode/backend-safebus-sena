import { z } from 'zod';

export const crearLocalidadSchema = z.object({
    nombre: z.string({
        required_error: 'El nombre es requerido' // Mensaje de error personalizado si el campo nombre es requerido pero no se proporciona
    }).max(30,{
        message: 'El nombre debe tener 30 caracteres' // Mensaje de error personalizado si el campo nombre tiene más de 30 caracteres
    }),
    acronimo: z.string({
        required_error: 'El acronimo es requerido' // Mensaje de error personalizado si el campo acronimo es requerido pero no se proporciona
    }).max(3,{
        message: 'El acronimo debe tener 3 caracteres' // Mensaje de error personalizado si el campo acronimo tiene más de 3 caracteres
    })
});
