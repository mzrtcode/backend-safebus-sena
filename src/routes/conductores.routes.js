import { Router } from 'express'
import { actualizarConductor, crearConductor, eliminarConductor, obtenerConductor, obtenerConductores } from '../controllers/conductores.controller.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/conductores', obtenerConductores)
router.get('/conductores/:id', obtenerConductor)
router.post(
  '/conductores',
  autenticacionRequerida, // Middleware para validar la autenticación requerida antes de crear una localidad.
  crearConductor // Controlador de creación de localidad.
)
router.put('/conductores/:id', actualizarConductor) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/conductores/:id', eliminarConductor) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
