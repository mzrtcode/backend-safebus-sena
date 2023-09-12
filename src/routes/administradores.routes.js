import { Router } from 'express'
import { actualizarAdministrador, crearAdministrador, eliminarAdministrador, obtenerAdministrador, obtenerAdministradores, resetearClave } from '../controllers/administradores.controller.js'
import { autenticacionAdmin, autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/administradores',autenticacionAdmin, obtenerAdministradores)
router.get('/administradores/:id', autenticacionAdmin,  obtenerAdministrador)
router.post(
  '/administradores',
  autenticacionAdmin, // Middleware para validar la autenticación requerida antes de crear una localidad.
  crearAdministrador // Controlador de creación de localidad.
)
router.post('/administradores/:id/resetear-clave', autenticacionAdmin, resetearClave)
router.put('/administradores/:id',autenticacionAdmin, actualizarAdministrador) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/administradores/:id',autenticacionAdmin, eliminarAdministrador) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
