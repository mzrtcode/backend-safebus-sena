import { Router } from 'express'
import { actualizarPropietario, crearPropietario, eliminarPropietario, obtenerPropietario, obtenerPropietarios } from '../controllers/propietarios.controller.js'
import { autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/propietarios', autenticacionRequerida, obtenerPropietarios)
router.get('/propietarios/:id', autenticacionRequerida, obtenerPropietario)
router.post(
  '/propietarios',
  autenticacionAdmin, // Middleware para validar la autenticación requerida antes de crear una localidad.
  crearPropietario // Controlador de creación de localidad.
)
router.put('/propietarios/:id', autenticacionAdmin, actualizarPropietario) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/propietarios/:id', autenticacionAdmin, eliminarPropietario) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router // Se exporta la instancia de enrutador como el módulo predeterminado
