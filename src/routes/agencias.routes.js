import { Router } from 'express'
import { actualizarAgencia, crearAgencia, eliminarAgencia, obtenerAgencia, obtenerAgencias } from '../controllers/agencias.controller.js'
import { autenticacionAdmin, autenticacionRequerida } from '../middlewares/validarToken.middleware.js'

const router = Router()

router.get('/agencias',autenticacionRequerida, obtenerAgencias)
router.get('/agencias/:id', autenticacionRequerida, obtenerAgencia)
router.post(
  '/agencias',
  autenticacionAdmin, // Middleware para validar la autenticación requerida antes de crear una localidad.
  crearAgencia // Controlador de creación de localidad.
)
router.put('/agencias/:id', autenticacionAdmin, actualizarAgencia) // Ruta para actualizar una localidad por su ID. Llama al controlador de actualización de localidad.
router.delete('/agencias/:id',autenticacionAdmin, eliminarAgencia) // Ruta para eliminar una localidad por su ID. Llama al controlador de eliminación de localidad. */

export default router
