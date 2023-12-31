import { Router } from 'express'
import { validarSchema } from '../middlewares/schemaValidator.middleware.js'
import { actualizarLocalidad, crearLocalidad, eliminarLocalidad, obtenerLocalidad, obtenerLocalidades } from '../controllers/localidades.controller.js'
import { crearLocalidadSchema } from '../schemas/localidades.schema.js'
import { autenticacionAdmin, autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/localidades', autenticacionRequerida, obtenerLocalidades)
router.get('/localidades/:id', autenticacionRequerida, obtenerLocalidad)
router.post(
  '/localidades',
  autenticacionAdmin, // Middleware para validar la autenticación requerida antes de crear una localidad.
  validarSchema(crearLocalidadSchema), // Middleware para validar el esquema de creación de localidad antes de llamar al controlador de creación de localidad.
  crearLocalidad // Controlador de creación de localidad.
)
router.put('/localidades/:id', autenticacionAdmin, actualizarLocalidad) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/localidades/:id', autenticacionAdmin, eliminarLocalidad) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad.

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
