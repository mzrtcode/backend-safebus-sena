import { Router } from 'express'
import { actualizarAdministrador, crearAdministrador, eliminarAdministrador, obtenerAdministrador, obtenerAdministradores, resetearClave } from '../controllers/administradores.controller.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/administradores', obtenerAdministradores)
router.get('/administradores/:id', obtenerAdministrador)
router.post(
  '/administradores',
  autenticacionRequerida, // Middleware para validar la autenticación requerida antes de crear una localidad.
  crearAdministrador // Controlador de creación de localidad.
)
router.post('/administradores/:id/resetear-clave', resetearClave)
router.put('/administradores/:id', actualizarAdministrador) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/administradores/:id', eliminarAdministrador) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
