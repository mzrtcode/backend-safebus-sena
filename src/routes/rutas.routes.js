import { Router } from 'express'
import { actualizarRuta, crearRuta, eliminarRuta, obtenerRuta, obtenerRutas } from '../controllers/rutas.controller.js'
import { crearRutaSchema } from '../schemas/rutas.schema.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'
import { validarSchema } from '../middlewares/schemaValidator.middleware.js'

const router = Router()

router.get('/rutas', autenticacionRequerida, obtenerRutas)
router.get('/rutas/:id', autenticacionRequerida, obtenerRuta)
router.post(
  '/rutas',
  autenticacionAdmin, // Middleware para validar la autenticación requerida antes de crear una localidad.
  validarSchema(crearRutaSchema), // Middleware para validar el esquema de creación de localidad antes de llamar al controlador de creación de localidad.
  crearRuta // Controlador de creación de localidad.
)
router.put('/rutas/:id', autenticacionAdmia, actualizarRuta) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/rutas/:id', autenticacionAdmin, eliminarRuta) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
